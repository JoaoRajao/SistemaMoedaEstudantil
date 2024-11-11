import { z } from "zod";

const tokenPayloadSchema = z.object({
  exp: z.number(),
  iat: z.number(),
  sub: z.string(),
  email: z.string().email(),
  role: z.string(),
});

export const parseJwt = (
  token: string
): z.SafeParseReturnType<
  z.infer<typeof tokenPayloadSchema>,
  z.infer<typeof tokenPayloadSchema>
> => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(window.atob(base64));
    return tokenPayloadSchema.safeParse(payload);
  } catch (error) {
    return {
      success: false,
      error: new z.ZodError([
        {
          code: "custom",
          path: ["token"],
          message: "Token inválido",
        },
      ]),
    };
  }
};

export const isTokenExpired = (token: string): boolean => {
  const result = parseJwt(token);
  if (!result.success) return true;

  const currentTime = Date.now() / 1000;
  return result.data.exp < currentTime;
};
