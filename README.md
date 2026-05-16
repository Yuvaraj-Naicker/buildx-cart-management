# Cart Management Module — BuildX Challenge 2026

## Overview
Cart Management module for the Responsive Multi-Vendor Ecommerce Platform.

**Team:** Cart Management Team  
**Domain:** Logic + Frontend  
**Stack:** React.js + PHP API + MySQL

## Features
- Add to cart
- Remove cart item
- Quantity update
- Cart total calculation
- Persistent cart (localStorage + API sync)

## Installation
npm install
npm run dev

## Environment Setup
Copy `.env.example` to `.env` and fill in your API URL.

## Folder Structure
src/
├── components/   → CartItem, CartSummary
├── pages/        → CartPage
├── hooks/        → useCart (cart state logic)
├── services/     → cartService (API calls)
└── utils/        → cartHelpers (total calculation)
