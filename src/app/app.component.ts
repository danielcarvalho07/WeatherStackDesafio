import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public title = "Weather"
  public city = ''
  public clima = 'Digite abaixo a cidade que deseja consultar o clima :)'
  public temp = ' '
  public data = ' '
  public regiao = ' '
  public icon = ''

  /// Objeto contendo o url e a access key da API, caso queira testar usando sua própria key
  weatherAPI = { 
      url: "http://api.weatherstack.com/current",
      access_key: "46b2cf461ed1d8357f321d537c1ffd7f"

  }

  ///Fazendo a requisição na API e enviando os dados para a função que colocará os dados no display
  resultadosPesquisa(nome_cidade:String) {
      fetch(`${this.weatherAPI.url}?access_key=${this.weatherAPI.access_key}&query=${nome_cidade}`)
      .then (response => {
          if (!response.ok) {
              throw new Error (`http error: status ${response.status}`)
          }
          return response.json();
      })
      .catch(error => {
          alert(error.message)
      })
      .then(response => {
        this.mostrarResultados(response)
    })
  }

    ///Substituindo os textos vazios do weather.html pelos dados trazidos pela API, exibindo-os na tela
    mostrarResultados(resultados:JSON)
    {
        if (`${(resultados as any).success}` != 'false')
        {
            this.city = `${(resultados as any).location.name}` + `, ${(resultados as any).location.country}`
            this.clima = `${(resultados as any).current.weather_descriptions}`
            this.temp = `${(resultados as any).current.temperature}` + "ºC"
            this.data = `${(resultados as any).location.localtime}`
            this.regiao = `${(resultados as any).location.region}`
            let iconname = (resultados as any).current.weather_icons
            this.icon = `${iconname}`
        }
        else
        {
            this.city = 'Erro! Cidade não encontrada'
            this.clima = ''
            this.temp = ''
            this.data = ''
            this.regiao = ''
            this.icon = ''
        }
    }
}   