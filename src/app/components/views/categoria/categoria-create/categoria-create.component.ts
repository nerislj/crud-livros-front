import { Component } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent {

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private router: Router) {}

  ngOnInit(): void {
    //PRIMEIRA INICIALIZAÇÃO FINDALL
  
  }

  create(): void {
    this.service.create(this.categoria).subscribe((resposta) =>
    {
      this.service.mensagem('Categoria criada com sucesso!');
      this.router.navigate(["categorias"]);

    }, err => {
      for(let i = 0; i < err.error.errors.length; i++){
        this.service.mensagem(err.error.errors[i].message);
      }
    })
  
  }


}