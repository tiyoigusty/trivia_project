import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('questions')
  async getQuestions() {
    return this.quizService.getQuestions();
  }

  @Post('answer')
  async answerQuestion(
    @Body('questionId') questionId: string,
    @Body('answereId') answereId: string,
    @Body('userId') userId: string,
  ): Promise<{ isCorrect: boolean }> {
    const isCorrect = await this.quizService.answerQuestion(
      questionId,
      answereId,
      userId,
    );
    return { isCorrect };
  }
}
