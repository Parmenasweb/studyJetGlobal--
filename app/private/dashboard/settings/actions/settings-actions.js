'use server';

import { revalidatePath } from 'next/cache';
import Settings from '../models/settings';
import { connectToDatabase } from '@/lib/db';

export async function getSettings() {
  try {
    await connectToDatabase();
    const settings = await Settings.getSettings();
    return { settings };
  } catch (error) {
    return { error: 'Failed to fetch settings' };
  }
}

export async function updateGeneralSettings(data) {
  try {
    await connectToDatabase();
    const settings = await Settings.findOneAndUpdate(
      {},
      {
        siteName: data.siteName,
        siteDescription: data.siteDescription,
        contactEmail: data.contactEmail,
        timezone: data.timezone,
        dateFormat: data.dateFormat,
      },
      { new: true, runValidators: true }
    );

    revalidatePath('/private/dashboard/settings');
    return { settings };
  } catch (error) {
    return { error: error.message || 'Failed to update general settings' };
  }
}

export async function updateEmailSettings(data) {
  try {
    await connectToDatabase();
    const settings = await Settings.findOneAndUpdate(
      {},
      {
        emailProvider: data.emailProvider,
        emailSettings: data.emailSettings,
      },
      { new: true, runValidators: true }
    );

    revalidatePath('/private/dashboard/settings');
    return { settings };
  } catch (error) {
    return { error: error.message || 'Failed to update email settings' };
  }
}

export async function updateNotificationSettings(data) {
  try {
    await connectToDatabase();
    const settings = await Settings.findOneAndUpdate(
      {},
      {
        notifications: data,
      },
      { new: true, runValidators: true }
    );

    revalidatePath('/private/dashboard/settings');
    return { settings };
  } catch (error) {
    return { error: error.message || 'Failed to update notification settings' };
  }
}

export async function updateSecuritySettings(data) {
  try {
    await connectToDatabase();
    const settings = await Settings.findOneAndUpdate(
      {},
      {
        security: data,
      },
      { new: true, runValidators: true }
    );

    revalidatePath('/private/dashboard/settings');
    return { settings };
  } catch (error) {
    return { error: error.message || 'Failed to update security settings' };
  }
}

export async function createApiKey(data) {
  try {
    await connectToDatabase();
    const settings = await Settings.findOne();
    
    settings.apiKeys.push({
      ...data,
      key: generateApiKey(),
      createdAt: new Date(),
    });
    
    await settings.save();
    revalidatePath('/private/dashboard/settings');
    return { settings };
  } catch (error) {
    return { error: error.message || 'Failed to create API key' };
  }
}

export async function deleteApiKey(keyId) {
  try {
    await connectToDatabase();
    const settings = await Settings.findOne();
    
    settings.apiKeys = settings.apiKeys.filter(
      key => key._id.toString() !== keyId
    );
    
    await settings.save();
    revalidatePath('/private/dashboard/settings');
    return { success: true };
  } catch (error) {
    return { error: error.message || 'Failed to delete API key' };
  }
}

export async function updateIntegrationSettings(data) {
  try {
    await connectToDatabase();
    const settings = await Settings.findOneAndUpdate(
      {},
      {
        integrations: data,
      },
      { new: true, runValidators: true }
    );

    revalidatePath('/private/dashboard/settings');
    return { settings };
  } catch (error) {
    return { error: error.message || 'Failed to update integration settings' };
  }
}

export async function updateAppearanceSettings(data) {
  try {
    await connectToDatabase();
    const settings = await Settings.findOneAndUpdate(
      {},
      {
        appearance: data,
      },
      { new: true, runValidators: true }
    );

    revalidatePath('/private/dashboard/settings');
    return { settings };
  } catch (error) {
    return { error: error.message || 'Failed to update appearance settings' };
  }
}

export async function updateBackupSettings(data) {
  try {
    await connectToDatabase();
    const settings = await Settings.findOneAndUpdate(
      {},
      {
        backup: data,
      },
      { new: true, runValidators: true }
    );

    revalidatePath('/private/dashboard/settings');
    return { settings };
  } catch (error) {
    return { error: error.message || 'Failed to update backup settings' };
  }
}

export async function triggerManualBackup() {
  try {
    await connectToDatabase();
    // Implement backup logic here
    const settings = await Settings.findOneAndUpdate(
      {},
      {
        'backup.lastBackup': new Date(),
      },
      { new: true }
    );

    revalidatePath('/private/dashboard/settings');
    return { settings };
  } catch (error) {
    return { error: error.message || 'Failed to trigger backup' };
  }
}

// Helper function to generate API keys
function generateApiKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const segments = 4;
  const segmentLength = 8;
  
  const segment = Array(segments)
    .fill(0)
    .map(() =>
      Array(segmentLength)
        .fill(0)
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join('')
    );
  
  return segment.join('-');
} 