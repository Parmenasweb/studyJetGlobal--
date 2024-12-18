'use server';

import { revalidatePath } from 'next/cache';
import Deadline from '../models/deadline';
import { connectToDatabase } from '@/lib/db';

export async function getDeadlines(studentId) {
  try {
    await connectToDatabase();
    const deadlines = await Deadline.find({ studentId })
      .sort({ date: 1 })
      .lean();
    
    return { deadlines };
  } catch (error) {
    return { error: 'Failed to fetch deadlines' };
  }
}

export async function getDeadlineById(id) {
  try {
    await connectToDatabase();
    const deadline = await Deadline.findById(id).lean();
    
    if (!deadline) {
      return { error: 'Deadline not found' };
    }
    
    return { deadline };
  } catch (error) {
    return { error: 'Failed to fetch deadline' };
  }
}

export async function createDeadline(data) {
  try {
    await connectToDatabase();
    
    const deadline = await Deadline.create(data);
    revalidatePath('/private/dashboard/deadlines');
    
    return { deadline };
  } catch (error) {
    return { error: error.message || 'Failed to create deadline' };
  }
}

export async function updateDeadline(id, data) {
  try {
    await connectToDatabase();
    
    const deadline = await Deadline.findByIdAndUpdate(
      id,
      { ...data },
      { new: true, runValidators: true }
    );
    
    if (!deadline) {
      return { error: 'Deadline not found' };
    }
    
    revalidatePath('/private/dashboard/deadlines');
    return { deadline };
  } catch (error) {
    return { error: error.message || 'Failed to update deadline' };
  }
}

export async function deleteDeadline(id) {
  try {
    await connectToDatabase();
    
    const deadline = await Deadline.findByIdAndDelete(id);
    
    if (!deadline) {
      return { error: 'Deadline not found' };
    }
    
    revalidatePath('/private/dashboard/deadlines');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete deadline' };
  }
}

export async function updateDeadlineProgress(id, progress) {
  try {
    await connectToDatabase();
    
    const deadline = await Deadline.findByIdAndUpdate(
      id,
      { progress },
      { new: true, runValidators: true }
    );
    
    if (!deadline) {
      return { error: 'Deadline not found' };
    }
    
    revalidatePath('/private/dashboard/deadlines');
    return { deadline };
  } catch (error) {
    return { error: 'Failed to update deadline progress' };
  }
}

export async function updateDeadlineStatus(id, status) {
  try {
    await connectToDatabase();
    
    const deadline = await Deadline.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!deadline) {
      return { error: 'Deadline not found' };
    }
    
    revalidatePath('/private/dashboard/deadlines');
    return { deadline };
  } catch (error) {
    return { error: 'Failed to update deadline status' };
  }
} 