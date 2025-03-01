export const generateTimeSlots = (
  open: string,
  close: string,
  interval = 60
): string[] => {
  const slots: string[] = []; // ✅ Explicitly set the type as string[]
  let current = new Date();
  const [openHour, openMinute] = open.split(":").map(Number);
  const [closeHour, closeMinute] = close.split(":").map(Number);

  current.setHours(openHour, openMinute, 0, 0);
  const endTime = new Date();
  endTime.setHours(closeHour, closeMinute, 0, 0);

  while (current < endTime) {
    const time = current.toTimeString().slice(0, 5); // Format as HH:mm
    slots.push(time); // ✅ No more 'never' type issue
    current.setMinutes(current.getMinutes() + interval);
  }
  return slots;
};
