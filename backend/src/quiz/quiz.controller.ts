import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('questions')
  async getQuestions() {
    return this.quizService.getQuestions();
  }

  @Post('userAnswere')
  async submitAnswere(
    @Body() answerDto: CreateQuizDto,
  ): Promise<{ correct: boolean; score: number }> {
    return this.quizService.checkAnswere(answerDto);
  }
}
