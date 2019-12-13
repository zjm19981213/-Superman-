import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  /*获取每一个英雄模板 */
  heroes: Hero[];
  /*这个参数共做了两件事第一件事就是声明了一个私有heroService属性
  第二个就是把它标记为一个HeroService的注入点 */
  constructor(private heroService: HeroService) { }
  /*获取英雄列表 */
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
  ngOnInit() {
    this.getHeroes();
  }

  /*添加一个英雄 */
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return ;
    }
    this.heroService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  /*删除一个英雄 */
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
