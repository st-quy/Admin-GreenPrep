const BASE_URL = import.meta.env.VITE_BASE_URL;

export const sendEmail = async (userId, payload) => {
  try {
    const res = await fetch(`${BASE_URL}/send-email/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(`❌ Failed to send email to user ${userId}:`, error);
    throw error;
  }
};
