import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionTitle } from '../models/question-title';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8080/api';
  // private baseUrl = 'https://797e-2405-201-5012-3821-4856-f41d-2f3c-8d5a.ngrok-free.app';
  constructor(private http: HttpClient) { }

  getQuestionTitlesList(): Observable<QuestionTitle[]> {
    return this.http.get<QuestionTitle[]>(`${this.baseUrl}/question/titles`);
  }

  getQuestionsById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/question/find?id=${id}`);
  }

  getRandomQuestion(): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/question/random`);
  }

  toString(question: Question): string {
    return `Question: ${question.id} ${question.title} ${question.difficulty} ${question.tags} ${question.companies} ${question.description} ${question.constraints} ${question.javaBoilerplateCode} ${question.c11BoilerplateCode} ${question.cppBoilerplateCode} ${question.pythonBoilerplateCode} ${question.defaultInputs} ${question.createdAt} ${question.updatedAt} ${question.extraInfo} ${question.hints} ${question.examples}`;
  }

  runCode(language: string, code: string, defaultInputs: string): Observable<any> {
    const payload = {
      language: language,
      code: code,
      defaultInputs: defaultInputs,
    };

    return this.http.post(`${this.baseUrl}/code/run`, payload);
  }
}
