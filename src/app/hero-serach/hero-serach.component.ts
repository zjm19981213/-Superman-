import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Hero } from '../hero';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-serach',
  templateUrl: './hero-serach.component.html',
  styleUrls: ['./hero-serach.component.css']
})
export class HeroSerachComponent implements OnInit {
  /*$ 是一个命名惯例，用来表明 heroes$ 是一个 Observable，而不是数组。 */
  heroes$: Observable<Hero[]>;

  private searchTerms = new Subject<string>();
  constructor(private heroService: HeroService) { }

  /*将搜索词推入可观察流中 */
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 每次输入内容的时候会等待300毫秒再去匹配相对应的英雄
      debounceTime(300),

      // 如果输入的内容和原名称相同，那么忽略新输入的名称
      distinctUntilChanged(),

      // 切换到新的搜索可观察到的时候，每次术语变化
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
