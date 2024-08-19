// import { Injectable } from '@nestjs/common';
// import { CreateQuizDto } from './dto/create-quiz.dto';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class QuizService {
//   constructor(private readonly prisma: PrismaService) {}

//   // Mendapatkan semua pertanyaan beserta jawabannya
//   async getQuestions() {
//     return this.prisma.question.findMany({
//       include: { answere: true },
//     });
//   }

//   // Memeriksa jawaban yang dipilih oleh pengguna
//   async checkAnswere(
//     answerDto: CreateQuizDto,
//   ): Promise<{ correct: boolean; score: number }> {
//     const { questionId, answerId, userId } = answerDto;

//     // Mencari pertanyaan beserta jawabannya
//     const question = await this.prisma.question.findUnique({
//       where: { id: questionId },
//       include: { answere: true },
//     });

//     if (!question) {
//       throw new Error('Pertanyaan tidak ditemukan');
//     }

//     // Mencari jawaban yang dipilih
//     const selectedAnswer = await this.prisma.answere.findUnique({
//       where: { id: answerId },
//     });

//     if (!selectedAnswer) {
//       throw new Error('Jawaban tidak ditemukan');
//     }

//     // Menentukan apakah jawaban yang dipilih benar

//     // Menyimpan jawaban pengguna dan menghitung skor
//     const data = await this.prisma.userAnswere.create({
//       data: {

//         questionId,
//         answereId: answerId,
//         userId,

//       },
//     });
//   }
// }
