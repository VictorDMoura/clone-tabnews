function status(request, response) {
  return response.status(200).json({ chave: "são acima da média" });
}

export default status;
