function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

export function onRequestPost() {
  return json(
    { error: "Приём заявок временно недоступен. Канал связи обновляется." },
    503
  );
}

export function onRequestGet() {
  return json({ ok: true, submissionsEnabled: false });
}
