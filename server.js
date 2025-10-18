// Lister les produits
app.get("/products", (req, res) => {
  const data = getData();
  res.json(data.products || []);
});

// Ajouter un produit
app.post("/products", (req, res) => {
  const data = getData();
  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
    "type de creation": req.body["type de creation"],
    "detail de la commande": req.body["detail de la commande"]
  };
  data.products.push(newProduct);
  saveData(data);
  res.status(201).json(newProduct);
});

// Modifier un produit
app.put("/products/:id", (req, res) => {
  const data = getData();
  const id = Number(req.params.id);
  const index = data.products.findIndex(p => Number(p.id) === id);
  if (index === -1) return res.status(404).json({ message: "Produit non trouvé" });

  data.products[index] = {
    ...data.products[index],
    ...req.body // permet de modifier tous les champs
  };
  saveData(data);
  res.json(data.products[index]);
});

// Supprimer un produit
app.delete("/products/:id", (req, res) => {
  const data = getData();
  const id = Number(req.params.id);
  const index = data.products.findIndex(p => Number(p.id) === id);
  if (index === -1) return res.status(404).json({ message: "Produit non trouvé" });

  data.products.splice(index, 1);
  saveData(data);
  res.json({ message: "Produit supprimé" });
});
app.post("/login", (req, res) => {
  const data = getData();
  const { email, password } = req.body;

  const user = data.users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

  if (user.role !== "admin") return res.status(403).json({ message: "Accès refusé : non administrateur" });

  res.json({ message: "Connexion réussie", user: { id: user.id, name: user.name, role: user.role } });
});

