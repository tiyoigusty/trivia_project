import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const avatars = [
    {
      image:
        'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611716.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_hybrid',
      coin: 0,
      diamond: 0,
    },
    {
      image:
        'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611722.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_hybrid',
      coin: 0,
      diamond: 0,
    },
    {
      image:
        'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611750.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_hybrid',
      coin: 0,
      diamond: 0,
    },
    {
      image:
        'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611756.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_hybrid',
      coin: 0,
      diamond: 0,
    },
    {
      image:
        'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611753.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_hybrid',
      coin: 0,
      diamond: 0,
    },
    {
      image:
        'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611746.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_hybrid',
      coin: 0,
      diamond: 0,
    },
    {
      image:
        'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611734.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_hybrid',
      coin: 5000,
      diamond: 0,
    },
    {
      image:
        'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611765.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_hybrid',
      coin: 5000,
      diamond: 0,
    },
    {
      image:
        'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611719.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_hybrid',
      coin: 5000,
      diamond: 0,
    },
    {
      image:
        'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611762.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_hybrid',
      coin: 0,
      diamond: 750,
    },
    {
      image:
        'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611707.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_hybrid',
      coin: 0,
      diamond: 750,
    },
    {
      image:
        'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611759.jpg?ga=GA1.1.1613538227.1710145113&semt=ais_hybrid',
      coin: 0,
      diamond: 750,
    },
  ];

  for (const avatar of avatars) {
    await prisma.avatar.create({
      data: avatar,
    });
  }

  console.log('Avatars seeded');

  const diamonds = [
    {
      quantity: 100,
      price: 20000,
    },
    {
      quantity: 250,
      price: 39000,
    },
    {
      quantity: 500,
      price: 69000,
    },
    {
      quantity: 1000,
      price: 137000,
    },
    {
      quantity: 2500,
      price: 280000,
    },
    {
      quantity: 5000,
      price: 500000,
    },
  ];

  for (const diamond of diamonds) {
    await prisma.diamond.create({
      data: diamond,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
