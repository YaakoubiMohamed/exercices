import { Component } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';

interface PipeInfo {
  name: string;
  category: string;
  description: string;
  syntax: string;
  example: string;
  output: string;
}

@Component({
  selector: 'app-pipes',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, DecimalPipe, PercentPipe],
  templateUrl: './pipes.component.html',
  styleUrl: './pipes.component.css'
})
export class PipesComponent {
  // Demo data
  today = new Date();
  price = 1234.56;
  percentage = 0.759;
  largeNumber = 9876543.21;
  text = 'Angular Pipes';
  data$: Observable<string> = of('Async Data Loaded!');

  builtInPipes: PipeInfo[] = [
    {
      name: 'DatePipe',
      category: 'Transformation',
      description: 'Formate les dates selon différents formats',
      syntax: '{{ value | date:\'format\' }}',
      example: '{{ today | date:\'short\' }}',
      output: 'MM/DD/YY, h:mm a'
    },
    {
      name: 'UpperCasePipe',
      category: 'Transformation',
      description: 'Convertit le texte en majuscules',
      syntax: '{{ value | uppercase }}',
      example: '{{ "hello" | uppercase }}',
      output: 'HELLO'
    },
    {
      name: 'LowerCasePipe',
      category: 'Transformation',
      description: 'Convertit le texte en minuscules',
      syntax: '{{ value | lowercase }}',
      example: '{{ "WORLD" | lowercase }}',
      output: 'world'
    },
    {
      name: 'CurrencyPipe',
      category: 'Transformation',
      description: 'Formate les nombres en devise',
      syntax: '{{ value | currency:\'code\' }}',
      example: '{{ 1234.56 | currency:\'USD\' }}',
      output: '$1,234.56'
    },
    {
      name: 'DecimalPipe',
      category: 'Transformation',
      description: 'Formate les nombres décimaux',
      syntax: '{{ value | number:\'format\' }}',
      example: '{{ 1234.567 | number:\'1.2-2\' }}',
      output: '1,234.57'
    },
    {
      name: 'PercentPipe',
      category: 'Transformation',
      description: 'Formate les nombres en pourcentage',
      syntax: '{{ value | percent:\'format\' }}',
      example: '{{ 0.759 | percent:\'1.1-1\' }}',
      output: '75.9%'
    },
    {
      name: 'AsyncPipe',
      category: 'Spécial',
      description: 'Souscrit automatiquement aux Observables/Promises',
      syntax: '{{ observable$ | async }}',
      example: '{{ data$ | async }}',
      output: 'Valeur émise'
    },
    {
      name: 'JsonPipe',
      category: 'Debug',
      description: 'Convertit un objet en JSON',
      syntax: '{{ object | json }}',
      example: '{{ {name: "John"} | json }}',
      output: '{"name": "John"}'
    }
  ];

  dateFormats = [
    { format: 'short', example: this.today },
    { format: 'medium', example: this.today },
    { format: 'long', example: this.today },
    { format: 'full', example: this.today },
    { format: 'shortDate', example: this.today },
    { format: 'dd/MM/yyyy', example: this.today }
  ];
}
