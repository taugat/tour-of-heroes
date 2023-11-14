import { NgFor } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroDetailComponent } from "../hero-detail/hero-detail.component";
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrl: './heroes.component.css',
})
export class HeroesComponent implements OnInit{
  
  heroes: Hero[] = [];
  // selectedHero?: Hero;
  
  constructor(private heroService: HeroService, private messageService: MessageService) {}
  
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes)
  }
  
  add(name: string) {
    name = name.trim();
    if (name) {
      this.heroService.addHero({ name } as Hero)
        .subscribe(hero => this.heroes.push(hero));

    }
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

}
