import { Injectable } from '@angular/core';
import { TestCase } from '../models/TestCase';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private questionSubject = new BehaviorSubject<Question>({
    id: 0,
    title: '',
    difficulty: '',
    tags: '',
    companies: '',
    description: '',
    constraints: '',
    javaBoilerplateCode: '',
    c11BoilerplateCode: '',
    cppBoilerplateCode: '',
    pythonBoilerplateCode: '',
    defaultInputs: '',
    javaCode: '',
    createdAt: '',
    updatedAt: '',
    extraInfo: '',
    hints: [],
    examples: []
  });
  private testCasesSubject = new BehaviorSubject<TestCase[]>([]);
  private memoryUsedSubject = new BehaviorSubject<number>(0);
  private cpuTimeSubject = new BehaviorSubject<number>(0);
  private errorSubject = new BehaviorSubject<string>('');
  private isTestcaseSubject = new BehaviorSubject<boolean>(true);
  question$ = this.questionSubject.asObservable();
  testCases$ = this.testCasesSubject.asObservable();
  memoryUsed$ = this.memoryUsedSubject.asObservable();
  cpuTime$ = this.cpuTimeSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  isTestcase$ = this.isTestcaseSubject.asObservable();
  constructor() { }
  updateQuestion(question: Question) {
    this.questionSubject.next(question);
  }
  updateTestCases(testCases: TestCase[]) {
    this.testCasesSubject.next(testCases);
  }
  updateMemoryUsed(memoryUsed: number) {
    this.memoryUsedSubject.next(memoryUsed);
  }
  updateCpuTime(cpuTime: number) {
    this.cpuTimeSubject.next(cpuTime);
  }
  updateError(error: string) {
    this.errorSubject.next(error);
  }
  updateIsTestcase(isTestcase: boolean) {
    this.isTestcaseSubject.next(isTestcase);
  }
}
