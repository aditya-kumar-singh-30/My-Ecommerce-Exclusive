import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    const publicPages = ["/login", "/signup"]; 
    const protectedPages = ["/Checkout", "/Account"]; 

    const { pathname } = req.nextUrl;

    
    if (token && publicPages.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url)); 
    }

   
    if (!token && protectedPages.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", req.url)); 
    }

    return NextResponse.next(); 
}

export const config = {
  matcher: ["/Checkout", "/Account", "/login", "/signup"], 
};
