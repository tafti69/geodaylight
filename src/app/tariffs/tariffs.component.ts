import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tariffs } from './tariffs.model';
import { TariffService } from './tariffs.service';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.scss'],
})
export class TariffsComponent implements OnInit {
  tariffs: Tariffs[] = [];
  postSuccess = false;
  successMessage = '';
  postError = false;
  errorMessage = '';
  deleteMessage = '';
  isLoading = false;

  constructor(private tarifServ: TariffService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.tarifServ.getAllTariffs().subscribe((data: Tariffs[]) => {
      this.isLoading = false;
      this.tariffs = data;
    });
  }

  onDeleteTariff(id: number): void {
    this.tarifServ.deleteTariffs(id).subscribe(
      (data: void) => {
        let index: number = this.tariffs.findIndex((s) => s.id === id);
        this.tariffs.splice(index, 1);
      },
      (err: any) => console.log(err)
    );
    this.deleteMessage = `Тариф был успешно удален`;
    setTimeout(() => {
      this.deleteMessage = '';
    }, 1000);
  }

  onCreate(form: NgForm) {
    const value = form.value;
    const newT = new Tariffs();

    if (
      value.firstPrice === null ||
      value.firstPrice === '' ||
      value.firstPrice < 0
    ) {
      value.firstPrice = 0;
    }

    if (
      value.nextPrice === null ||
      value.nextPrice === '' ||
      value.nextPrice < 0
    ) {
      value.nextPrice = 0;
    }

    if (
      value.absolutPrice === null ||
      value.absolutPrice === '' ||
      value.absolutPrice < 0
    ) {
      value.absolutPrice = 0;
    }

    newT.firstPrice = value.firstPrice;
    newT.nextPrice = value.nextPrice;
    newT.absolutPrice = value.absolutPrice;
    newT.name = value.name;

    if (form.valid) {
      this.tarifServ.createTariff(newT).subscribe(
        (t: Tariffs[]) => {
          this.tariffs.push(...t);
        },
        (error: any) => console.log(error)
      );
      this.resetFormData(form);
      this.postSuccess = true;
      this.successMessage = 'Тариф успешно создан!';
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } else {
      this.handleError();
    }
  }

  resetFormData(form: NgForm) {
    form.resetForm();
  }

  handleError() {
    this.postSuccess = false;
    this.postError = true;
    this.errorMessage = 'Ошибка! Тариф не был создан.';
    setTimeout(() => {
      this.postError = false;
    }, 3000);
  }
}
