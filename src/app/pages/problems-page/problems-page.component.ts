import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import {Sort, MatSortModule} from '@angular/material/sort';
import { QuestionService } from '../../services/question.service';
import { QuestionTitle } from '../../models/question-title';

export interface Question {
    status: string;
    id: number;
    questionTitle: string;
    difficulty: string;
}
@Component({
    selector: 'app-problems-page',
    standalone: true,
    templateUrl: './problems-page.component.html',
    styleUrl: './problems-page.component.css',
    imports: [RouterLink, NavbarComponent, CommonModule, ChipModule, 
        TableModule, MatSortModule]
})

export class ProblemsPageComponent {
    isCollapsed = true;
    tags:string[] = [
        "Array",
        "String",
        "Hash Table",
        "Dynamic Programming",
        "Math",
        "Sorting",
        "Greedy",
        "Database",
        "Depth-First Search",
        "Binary Search",
        "Breadth-First Search",
        "Tree",
        "Matrix",
        "Two Pointers",
        "Bit Manipulation",
        "Binary Tree",
        "Heap (Priority Queue)",
        "Stack",
        "Prefix Sum",
        "Simulation",
        "Graph",
        "Design",
        "Counting",
        "Sliding Window",
        "Backtracking",
        "Union Find",
        "Enumeration",
        "Linked List",
        "Ordered Set",
        "Monotonic Stack",
        "Number Theory",
        "Trie",
        "Divide and Conquer",
        "Recursion",
        "Bitmask",
        "Queue",
        "Binary Search Tree",
        "Segment Tree",
        "Memoization",
        "Geometry",
        "Binary Indexed Tree",
        "Hash Function",
        "Topological Sort",
        "Combinatorics",
        "String Matching",
        "Shortest Path",
        "Rolling Hash",
        "Game Theory",
        "Data Stream",
        "Interactive",
        "Brainteaser",
        "Monotonic Queue",
        "Randomized",
        "Merge Sort",
        "Iterator",
        "Concurrency",
        "Doubly-Linked List",
        "Probability and Statistics",
        "Quickselect",
        "Bucket Sort",
        "Suffix Array",
        "Minimum Spanning Tree",
        "Counting Sort",
        "Shell",
        "Line Sweep",
        "Reservoir Sampling",
        "Strongly Connected Component",
        "Eulerian Circuit",
        "Radix Sort",
        "Rejection Sampling",
        "Biconnected Component"]
        
    sortedQuestions: QuestionTitle[];
    questionTitles: QuestionTitle[]= [];
  constructor(private questionService: QuestionService) {
    
    this.sortedQuestions = this.questionTitles.slice();
  }
  ngAfterViewInit() {
    this.questionService.getQuestionTitlesList().subscribe({
      next: (data) => {
        this.questionTitles = data;
        this.sortedQuestions = this.questionTitles.slice();
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  sortData(sort: Sort) {
    console.log(sort);
    const data = this.questionTitles.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedQuestions = data;
      return;
    }
    console.log(sort);
    this.sortedQuestions = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        // case 'status': return compare(a.status, b.status, isAsc);
        case 'id': return compare(a.id, b.id, isAsc);
        case 'questionTitle': return compare(a.title, b.title, isAsc);
        case 'difficulty': return compare(a.difficulty, b.difficulty, isAsc);
        default: return 0;
      }
    });
  }

  getStatusIcon(status: string) {
    return status === 'Solved' ? 'pi pi-check' : status === 'Attempted' ? 'pi pi-pencil' : 'pi pi-times';
  }

  getColor(difficulty: string) {
    switch (difficulty) {
      case 'EASY':
        return 'var(--green-500)';
      case 'MEDIUM':
        return 'var(--yellow-500)';
      case 'HARD':
        return 'var(--red-500)';
      default:
        return 'var(--text-color)';
    }
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
