export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Kiểm tra nếu yêu cầu là POST
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // Lấy dữ liệu từ form
    const formData = await request.formData();
    const prompt = formData.get("prompt")?.toString();

    if (!prompt) {
      return new Response("Missing prompt", { status: 400 });
    }

    // Gọi mô hình AI với prompt từ người dùng
    const inputs = { prompt };
    const response = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs
    );

    // Trả về hình ảnh
    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  },
};
