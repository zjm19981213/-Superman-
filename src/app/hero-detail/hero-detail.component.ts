/*框架插件要先import导入 */
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  /*hero属性必须是一个带有@Input()装饰器的输入属性，
  因为外部的HeroComponent组件将会绑定到它 */
  @Input() hero: Hero;
  constructor(
              private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  /*触发按钮事件。返回相对应的url地址页面 */
  goBack(): void {
    this.location.back();
  }
  /*触发按钮事件。返回对应的url地址页面同时修改英雄名称 */
  save(): void {
    this.heroService.updateHero(this.hero)
    .subscribe(() => this.goBack());
  }
}
