import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Pessoa } from './model/pessoa';
import { PessoaRequest } from './model/pessoa.request';
import { PessoaService } from './pessoa.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls, FullScreen, ScaleLine, Zoom } from 'ol/control';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrl: './pessoa.component.css'
})
export class PessoaComponent implements OnInit{


  pessoas: Pessoa[] = [];
  pessoa: PessoaRequest = {} as PessoaRequest;
  filteredPessoas: Pessoa[] = [];
  filterName: string = '';
  loading: boolean = true;
  totalPages: number = 0;
  page: number = 0;
  size: number = 20;
  selectedPessoa!: Pessoa | null;

  displayMapa: boolean = false;

  map!: Map; // Instância do mapa

  constructor(
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: LoginService,
  ) {}

   ngOnInit(): void {
    this.listarPessoas();
  }

  listarPessoas(id?: number, name?: string): void {
    this.pessoaService.listarPessoa(id, name, this.page, this.size).subscribe(page => {
      this.pessoas = page.content;
      this.totalPages = page.totalPages;
      this.loading = false;

      this.filterPessoas()
    });
  }

  editarPessoa(id: number): void {
    // Implementar a lógica para editar o usuário
    // this.router.navigate(['/usuario/']);
    this.router.navigate(['/pessoa/edit', id]);
    console.log('Editar pessoa', id);
  }

  desativarPessoa(id: number): void {
    this.pessoaService.desativar(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pessoa desativada' });
        this.listarPessoas();
      },
      error: (err) => {
        console.error('Erro ao desativar pessoa', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao desativar pessoa' });
      }
    });
  }

  deletarPessoa(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que gostaria de excluir a Pessoa?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-danger', // Classe customizada para o botão de aceitação
      rejectButtonStyleClass: 'p-button-secondary', // Classe customizada para o botão de rejeição
      accept: () => {
        this.pessoaService.deletar(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pessoa excluída com sucesso.' });
            this.listarPessoas();
          },
          error => {
            if (error.status === 400 && error.error.message === 'Pessoa possui relacionamentos e não pode ser excluída.') {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Pessoa não pode ser excluída pois possui relacionamentos com Lançamentos.' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'A pessoa selecionada possui relacionamento com Lançamento.' });
            }
          }
        );
      }
    });
  }

  novaPessoa(): void {
    this.router.navigate(['/pessoa/new']);
  }

  filterPessoas(): void {
    this.filteredPessoas = this.pessoas.filter(pessoa =>
      pessoa.name?.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }


  clearFilter(): void {
    this.filterName = '';
    this.filteredPessoas = this.pessoas;
  }

  canEdit(): boolean {
    return this.authService.hasRole('ADMIN_PRIVILEGE');
  }

  canDelete(): boolean {
    return this.authService.hasRole('ADMIN_PRIVILEGE');
  }

  canCreate(): boolean {
    return this.authService.hasRole('ADMIN_PRIVILEGE');
  }

  abrirMapa(pessoa: Pessoa): void {
    this.selectedPessoa = pessoa;
    this.displayMapa = true;

    setTimeout(() => {
      const mapElement = document.getElementById('map');
      if (mapElement) {
        this.map = new Map({
          target: mapElement,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          controls: defaultControls().extend([
            new Zoom(), // Controles de Zoom
            new FullScreen(), // Controle de Tela Cheia
            new ScaleLine({ units: 'metric' }), // Linha de escala métrica
          ]),
          view: new View({
            center: fromLonLat([pessoa.longitude || 0, pessoa.latitude || 0]), // Centraliza no local da pessoa ou no mundo
            zoom: pessoa.latitude && pessoa.longitude ? 15 : 2, // Zoom específico ou global
          }),
        });

        // Adiciona o marcador para a localização da pessoa
        if (pessoa.latitude !== undefined && pessoa.longitude !== undefined) {
          const marker = new Feature({
            geometry: new Point(fromLonLat([pessoa.longitude, pessoa.latitude])),
          });

          marker.setStyle(
            new Style({
              image: new Icon({
                anchor: [0.5, 1],
                src: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // Ícone do marcador
              }),
            })
          );

          const vectorLayer = new VectorLayer({
            source: new VectorSource({
              features: [marker],
            }),
          });

          this.map.addLayer(vectorLayer);
        }
      } else {
        console.error('Elemento do mapa não encontrado');
      }
    }, 100);
  }





  fecharMapa(): void {
    this.displayMapa = false; // Fecha o modal do mapa
    if (this.map) {
      this.map.setTarget(); // Desvincula o mapa
    }
  }

  async getLeaflet() {
    const L = await import('leaflet');
    return L;
  }
}
