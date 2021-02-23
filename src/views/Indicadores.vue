<template>
  <div class="p-5">
    <b-table striped hover :items="indicadores"></b-table>

    <div style="width:75%;">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  mounted() {
    var config = {
      type: "bar",
      data: {
        // labels: this.labels,
        datasets: this.datasets,
      },
    };

    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx, config);
  },

  computed: {
    ...mapGetters(["indicadores"]),
    labels() {
      return this.indicadores.map((i) => i.nombre);
    },
    datasets() {
      const dataset = this.indicadores.map((i) => {
        return {
          label: i.nombre,
          borderColor: window.chartColors.blue,
          borderWidth: 1,
          data: [i.valor],  
          fill: false,
        };
      });


      return dataset;
    },
  },
};
</script>
