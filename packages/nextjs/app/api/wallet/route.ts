import { NextResponse } from "next/server";
import { User } from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    
    const user = await User.findOne({ email });

    if (user?.wallet) {
      return NextResponse.json({
        success: true,
        data: user.wallet,
      });
    }

    return NextResponse.json(
      { success: false, error: "Wallet not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error in GET /api/wallet:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { email, walletAddress, provider = 'privy' } = await request.json();
    
    if (!email || !walletAddress) {
      return NextResponse.json(
        { success: false, error: "Email and wallet address are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    
    // Update or create user with wallet information
    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          wallet: {
            address: walletAddress,
            provider,
            createdAt: new Date(),
          },
        },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      data: user.wallet,
    });
  } catch (error) {
    console.error("Error in POST /api/wallet:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
