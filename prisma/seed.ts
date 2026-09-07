import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const books = [
  {
    title: "El Viaje de Luna",
    slug: "el-viaje-de-luna",
    description:
      "Un cuento mágico sobre una niña que viaja a la luna y descubre que los sueños pueden hacerse realidad. Perfecto para pequeños soñadores.",
    collection: "Aventuras Mágicas",
    ageRange: "3-6 años",
    standardEnabled: true,
    standardPrice: 8500,
    customEnabled: true,
    isNew: true,
  },
  {
    title: "Mi Amigo el Dragón",
    slug: "mi-amigo-el-dragon",
    description:
      "La historia de una amistad inesperada entre un niño y un dragón bebé que llega a su jardín una mañana de primavera.",
    collection: "Aventuras Mágicas",
    ageRange: "4-8 años",
    standardEnabled: true,
    standardPrice: 9200,
    customEnabled: true,
  },
  {
    title: "Las Estrellas Cuentan Cuentos",
    slug: "las-estrellas-cuentan-cuentos",
    description:
      "Cada estrella tiene una historia especial. Un libro personalizable donde tu hijo es el protagonista de una aventura estelar.",
    collection: "Sueños y Estrellas",
    ageRange: "2-5 años",
    standardEnabled: false,
    customEnabled: true,
    customDepositOverride: 6000,
    isSpecialEdition: true,
  },
  {
    title: "El Bosque Encantado",
    slug: "el-bosque-encantado",
    description:
      "Un paseo por un bosque donde los árboles hablan y los animales comparten sus secretos. Ilustraciones en acuarela originales.",
    collection: "Naturaleza Viva",
    ageRange: "3-7 años",
    standardEnabled: true,
    standardPrice: 7800,
    customEnabled: false,
  },
  {
    title: "Colores del Arcoíris",
    slug: "colores-del-arcoiris",
    description:
      "Un cuento interactivo donde cada página explora un color diferente con sorpresas y actividades para los más pequeños.",
    collection: "Primeros Pasos",
    ageRange: "1-3 años",
    standardEnabled: true,
    standardPrice: 6500,
    customEnabled: true,
    isNew: true,
  },
  {
    title: "La Princesa Valiente",
    slug: "la-princesa-valiente",
    description:
      "Una princesa que no espera ser rescatada, sino que sale a explorar el mundo y resolver misterios con ingenio y valentía.",
    collection: "Aventuras Mágicas",
    ageRange: "5-9 años",
    standardEnabled: true,
    standardPrice: 9500,
    customEnabled: true,
    isSpecialEdition: true,
  },
];

async function main() {
  for (const book of books) {
    await prisma.book.upsert({
      where: { slug: book.slug },
      update: {},
      create: {
        ...book,
        coverImage: "/book-placeholder.svg",
        previewImages: ["/book-placeholder.svg", "/book-placeholder.svg"],
      },
    });
  }

  await prisma.storeSettings.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default", customDepositDefault: 5000, supportEmail: "hola@cuentosarav.com" },
  });

  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "cambiar123";
  await prisma.user.upsert({
    where: { email: "admin@cuentosarav.com" },
    update: {},
    create: {
      email: "admin@cuentosarav.com",
      name: "Admin",
      role: "admin",
      passwordHash: await bcrypt.hash(adminPassword, 10),
    },
  });

  console.log("Seed completo. Admin: admin@cuentosarav.com /", adminPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
