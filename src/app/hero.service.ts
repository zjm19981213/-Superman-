import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of, from, pipe } from 'rxjs';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  /*添加一个私有的messageService属性参数 */
  constructor(
    private http: HttpClient,
    private messageService: MessagesService) { }
  private heroesUrl = 'http://localhost:3000/api/heroes';

  /*从服务器获取英雄 */
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fethed heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
   /**
    * 处理失败的 Http 操作。
    * 继续使用应用程式。
    * @param operation-失败的操作的名称
    * @param result-可选值返回可观察的结果
    */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // 将错误发送到远程日志基础设施
      console.error(error); // log to console instead

      // 更好地为用户消费转换错误
      this.log(`${operation} failed: ${error.message}`);

      // 通过返回一个空的结果，让应用程序继续运行
      return of(result as T);
    };
  }
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }
  /*通过id寻找英雄如果找不到将出现404 */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /*用 MessageService 记录 HeroService 消息 */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /*修改当前英雄的名称 */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /*给服务器添加一个新英雄 */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /*删除服务器的一个英雄 */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    /*问题: ''符号 与 ``符号里边内容的区别 */
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  /*获取名称包含搜索词的英雄 */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      /*如果搜索框里为空相应查出来的内容也为空 */
      return of([]);
    }
    /*返回包含输入框中的英雄 */
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
