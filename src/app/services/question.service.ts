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
  // private baseUrl = 'https://cc60-2405-201-5012-3821-50e4-2e69-e263-530a.ngrok-free.app/api/question';
  constructor(private http: HttpClient) { }

  getQuestionTitlesList(): Observable<QuestionTitle[]> {
    return this.http.get<QuestionTitle[]>(`${this.baseUrl}/question/titles`);
  }

  getAllQuestionsById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/question/find?id=${id}`);
  }

  toString(question: Question): string {
    return `Question: ${question.id} ${question.title} ${question.difficulty} ${question.tags} ${question.companies} ${question.description} ${question.constraints} ${question.javaBoilerplateCode} ${question.c11BoilerplateCode} ${question.cppBoilerplateCode} ${question.pythonBoilerplateCode} ${question.defaultInputs} ${question.createdAt} ${question.updatedAt} ${question.extraInfo} ${question.hints} ${question.examples}`;
  }

  runCode(language: string, code: string, defaultInputs: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/code/run`, {
      language: language,
      code: code,
      defaultInputs: defaultInputs
    });
  }
}
