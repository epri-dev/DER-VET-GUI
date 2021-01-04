<template>
  <div class="col-md-12">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th class="table-align-center">Census Tract</th>
          <th class="table-align-center">CES Score</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-align-center"
            v-for="score in cesScores">
          <td>{{score.censusTract}}</td>
          <td>{{score.cesScore}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      cesScores: Array,
    },
  };
</script>
