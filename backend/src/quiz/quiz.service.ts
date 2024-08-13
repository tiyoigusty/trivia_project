import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  // Mendapatkan semua pertanyaan beserta jawabannya
  async getQuestions() {
    return this.prisma.question.findMany({
      include: { answere: true },
    });
  }

  // Memeriksa jawaban yang dipilih oleh pengguna
  async answerQuestion(
    questionId: string,
    answereId: string,
    userId: string,
  ): Promise<boolean> {
    // Cari pertanyaan berdasarkan ID
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
      include: { answere: true }, // Sertakan answere untuk memvalidasi jawaban
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    // Cari jawaban yang dipilih oleh user
    const answere = question.answere.find((ans) => ans.id === answereId);

    if (!answere) {
      throw new NotFoundException('Answere not found');
    }

    // Simpan jawaban user ke dalam tabel UserAnswere
    await this.prisma.userAnswere.create({
      data: {
        userId,
        answereId,
        questionId,
      },
    });

    // Kembalikan nilai is_correct untuk memberitahukan apakah jawaban benar atau salah
    return answere.is_correct;
  }
}
