import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  id_cat: String = "";

  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  titulo = new FormControl("", [Validators.minLength(3)])
  nomeAutor = new FormControl("", [Validators.minLength(3)])
  texto = new FormControl("", [Validators.minLength(10)])

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

   this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;

  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe((resposta) => {
     
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro criado com sucesso!');
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Erro ao criar novo Livro!');
    })
  }

  getMessageTitulo() {
    if (this.titulo.invalid) {
      return 'O campo TITULO deve conter entre 3 e 100 caracters';
    }
    return false;
  }

  getMessageAutor() {
    if (this.nomeAutor.invalid) {
      return 'O campo NOME AUTOR deve conter entre 3 e 100 caracters';
    }
    return false;
  }
  getMessageTexto() {
    if (this.texto.invalid) {
      return 'O campo TEXTO deve conter entre 10 e 2000000 caracters';
    }
    return false;
  }



}
