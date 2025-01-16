import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      "passport",
      "visa",
      "admission_letter",
      "academic_transcript",
      "english_proficiency",
      "financial_statement",
      "other"
    ],
  },
  title: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const emergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: String,
  address: String,
});

const clientSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: false,
      index: true,
      sparse: true,
    },
    status: {
      type: String,
      enum: ["lead", "active", "inactive"],
      default: "lead",
    },
    commission: {
      type: Number,
      min: 0,
      default: 0,
    },
    personalInfo: {
      email: { 
        type: String, 
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
        index: true
      },
      fullName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      nationality: {
        type: String,
        required: true,
      },
      currentResidence: {
        country: {
          type: String,
          required: true,
        },
        city: String,
        address: String,
      },
      passportNumber: {
        type: String,
        required: true,
      },
      emergencyContact: emergencyContactSchema,
    },
    academicInfo: {
      university: {
        name: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
      program: {
        name: {
          type: String,
          required: true,
        },
        level: {
          type: String,
          enum: ["foundation", "bachelor", "master", "phd"],
          required: true,
        },
        major: {
          type: String,
          required: true,
        },
      },
      enrollmentDate: Date,
      expectedGraduationDate: Date,
    },
    documents: [documentSchema],
    visaInfo: {
      type: {
        type: String,
      },
      number: {
        type: String,
      },
      issueDate: {
        type: Date,
      },
      expiryDate: {
        type: Date,
      },
      issuingCountry: {
        type: String,
      },
      status: {
        type: String,
        enum: ["active", "expired", "renewal_needed", "processing", "rejected"],
      },
      permitNumber: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Drop all indexes before creating new ones
clientSchema.pre('save', async function(next) {
  try {
    if (!this.isNew) {
      return next();
    }
    
    const collections = await mongoose.connection.db.listCollections({ name: 'clients' }).toArray();
    if (collections.length > 0) {
      await mongoose.connection.db.collection('clients').dropIndexes();
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Updated clientId generation logic
clientSchema.pre("save", async function (next) {
  if (!this.clientId) {
    try {
      // Get the current highest clientId number
      const highestClient = await mongoose.models.Client.findOne(
        { clientId: { $regex: /^CLT\d{5}$/ } },
        { clientId: 1 },
        { sort: { clientId: -1 } }
      );

      let nextNumber = 1;
      if (highestClient && highestClient.clientId) {
        const currentNumber = parseInt(highestClient.clientId.replace('CLT', ''));
        nextNumber = currentNumber + 1;
      }

      this.clientId = `CLT${String(nextNumber).padStart(5, '0')}`;

      // Verify the generated ID is unique
      let isUnique = false;
      let attempts = 0;
      const maxAttempts = 5;

      while (!isUnique && attempts < maxAttempts) {
        const existing = await mongoose.models.Client.findOne({ clientId: this.clientId });
        if (!existing) {
          isUnique = true;
        } else {
          nextNumber++;
          this.clientId = `CLT${String(nextNumber).padStart(5, '0')}`;
          attempts++;
        }
      }

      if (!isUnique) {
        console.error('Could not generate unique clientId after multiple attempts');
        next(new Error('Failed to generate unique clientId'));
        return;
      }
    } catch (error) {
      console.error("Error generating clientId:", error);
      next(error);
      return;
    }
  }
  next();
});

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;
