import { NextRequest, NextResponse } from 'next/server';
import { dataService } from '@/lib/dataService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, subject, message } = body;

    // Basic validation
    if (!username || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const contact = dataService.saveContact({
      username,
      email,
      subject,
      message
    });

    if (!contact) {
      return NextResponse.json(
        { success: false, error: 'Failed to save contact message' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contact,
      message: 'Contact message saved successfully'
    });

  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save contact message' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contacts = dataService.getContacts();

    return NextResponse.json({
      success: true,
      data: contacts
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}