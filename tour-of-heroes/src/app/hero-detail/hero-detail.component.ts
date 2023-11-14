import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { Location, NgIf, UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
})
export class HeroDetailComponent implements OnInit{
  hero: Hero|undefined;
  
  constructor(private activatedRoute: ActivatedRoute
    , private heroService: HeroService
    , private location: Location) {}
    
  ngOnInit(): void {
    this.getHero();
  }
    
  getHero(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    
    this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
    
  }
  
  save() {
    if(this.hero)
    {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
  
  goBack() {
    this.location.back();
  }
}

