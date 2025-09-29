import { NextRequest, NextResponse } from 'next/server';
import { dataService } from '@/lib/dataService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      firstName, 
      lastName, 
      username, 
      email, 
      password, 
      phone,
      dateOfBirth,
      gender,
      address,
      preferences 
    } = body;

    // Basic validation
    if (!firstName || !lastName || !username || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'First name, last name, username, email, and password are required' },
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

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const user = dataService.saveUser({
      firstName,
      lastName,
      username,
      email,
      password, 
      phone,
      dateOfBirth,
      gender,
      address,
      preferences: preferences || {
        newsletter: false,
        smsNotifications: false,
        emailNotifications: true
      },
      isAdmin: false,
      isVerified: false
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Failed to create user account' },
        { status: 500 }
      );
    }

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
      message: 'User account created successfully'
    });

  } catch (error: unknown) {
    console.error('Error creating user:', error);
    
    if (error instanceof Error && error.message === 'User with this email already exists') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create user account' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = dataService.getAllUsers();
    
    // Remove passwords from response
    const usersWithoutPasswords = users.map(user => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return NextResponse.json({
      success: true,
      data: usersWithoutPasswords
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}