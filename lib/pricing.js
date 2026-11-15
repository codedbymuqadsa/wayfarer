export const TAX_RATE = 0.12; // estimated taxes & service fees

export const computePricing = ({ price = 0, nights = 0, rooms = 1 }) => {
  const subtotal = Math.round(price * nights * rooms);
  const taxes = Math.round(subtotal * TAX_RATE);
  return { subtotal, taxes, total: subtotal + taxes };
};
