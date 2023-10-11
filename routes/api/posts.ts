import { Handlers } from "$fresh/server.ts";

const kv = await Deno.openKv();

export const handler: Handlers<unknown | null> = {
  async POST(req, _ctx) {
    const input = (await req.json());
    const ok = await kv.set(input.key, input.value);
    if (!ok) throw new Error("Something went wrong.");
    return new Response(JSON.stringify({
      result: "success",
    }), {
      headers: {
        "content-type": "application/json",
      },
    });
  },
  async GET(req, _ctx) {
    const result = []

    const user = kv.list({
      prefix: []
    });
    return new Response(JSON.stringify(user), {
      headers: {
        "content-type": "application/json",
      },
    });
  }
};