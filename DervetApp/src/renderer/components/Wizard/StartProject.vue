<!-- This is a placeholder -->
<template>
  <div class="container body-content">
    <h3>Project Configuration</h3>
    <div>{{ `Project ID: ${projectId}` }}</div>
    <div>{{ `Project Name: ${projectName}` }}</div>
    <div class="form-horizontal form-buffer">
            <div class="form-group">
                <div class="col-md-3">
                    <b>Project Name</b>
                </div>
                <div class="col-md-4 form-control-static">
                    <p>Insert ProjectName variable here</p>
                </div>
                <div class="col-md-5">
                    <p class="tool-tip">Name of the project.</p>
                </div>
            </div>
        <!-- <div class="form-group">
                <div class="col-md-3">
                    @Html.LabelFor(model => model.StartYear, new { @class = "control-label" })
                </div>
                <div class="col-md-9">
                    @Html.TextBoioxFor(model => model.StartYear, new { @class = "form-control numberbox", type = "number", min = "2000", step = "1" })
                    <span class="help-block">
                        @Html.ValidationMessageFor(model => model.StartYear, "", new { @class = "text-danger" })
                    </span>
                </div>
            </div>
            <fieldset class="section-group">
                <legend>Analysis Window</legend>
                <div class="form-group">
                    <div class="col-md-3">
                        @Html.LabelFor(model => model.AnalysisHorizonMode, new { @class = "control-label" })
                    </div>
                    <div class="col-md-9">
                        <span>
                            @Html.RadioButtonFor(model => model.AnalysisHorizonMode, Convert.ToInt32(Project.AnalysisHorizonModeTypes.UserDefined), new { disabled = "disabled" }) User-defined analysis horizon <br />
                            @Html.RadioButtonFor(model => model.AnalysisHorizonMode, Convert.ToInt32(Project.AnalysisHorizonModeTypes.AutoCalculate), new { disabled = "disabled" }) Auto-calculate analysis horizon <br />
                            @Html.RadioButtonFor(model => model.AnalysisHorizonMode, Convert.ToInt32(Project.AnalysisHorizonModeTypes.UseCarryingCost), new { disabled = "disabled" }) Use carrying cost
                            @Html.ValidationMessageFor(model => model.AnalysisHorizonMode, "", new { @class = "text-danger" })
                        </span>
                        <p class="tool-tip tooltip-col">Defines when/how to end CBA analysis.</p>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-3">
                        @Html.LabelFor(model => model.AnalysisHorizon, new { @class = "control-label" })
                    </div>
                    <div class="col-md-9">
                        @Html.TextBoxFor(model => model.AnalysisHorizon, new { @class = "form-control numberbox" })
                        <span class="unit-label">years</span>
                        <span class="help-block">
                            @Html.ValidationMessageFor(model => model.AnalysisHorizon, "", new { @class = "text-danger" })
                        </span>
                        <p class="tool-tip tooltip-col">The number of years the analysis will go for. The analysis will not consider equipment lifetime or anything else when determining the number of years to run for.</p>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-3">
                        @Html.LabelFor(model => model.DataYear, new { @class = "control-label" })
                    </div>
                    <div class="col-md-9">
                        @Html.TextBoxFor(model => model.DataYear, new { @class = "form-control numberbox", type = "number", min = "2000", step = "1" })
                        <span class="help-block">
                            @Html.ValidationMessageFor(model => model.DataYear, "", new { @class = "text-danger" })
                        </span>
                        <p class="tool-tip tooltip-col">DER-VET uses exactly one year of data. If the year this data comes from is different from the year the optimization is run against, it will be escalated from the data year to the optimization year.</p>
                    </div>
                </div>
            </fieldset>
            <div class="form-group">
                <div class="col-md-3">
                    @Html.LabelFor(model => model.GridLocation, new { @class = "control-label" })
                </div>
                <div class="col-md-9">
                    <span>
                        @Html.RadioButtonFor(model => model.GridLocation, Convert.ToInt32(Project.GridLocationTypes.Customer)) Customer <br />
                        @Html.RadioButtonFor(model => model.GridLocation, Convert.ToInt32(Project.GridLocationTypes.Distribution)) Distribution <br />
                        @Html.RadioButtonFor(model => model.GridLocation, Convert.ToInt32(Project.GridLocationTypes.Transmission)) Transmission <br />
                        @Html.RadioButtonFor(model => model.GridLocation, Convert.ToInt32(Project.GridLocationTypes.Generation)) Generation
                        @Html.ValidationMessageFor(model => model.GridLocation, "", new { @class = "text-danger" })
                    </span>
                    <p class="tool-tip tooltip-col">Which grid domain the project will be connected to. This limits which services are available.</p>
                </div>
            </div> -->
    <!--         <div class="form-group">
                <div class="col-md-3">
                    @Html.LabelFor(model => model.Ownership, new { @class = "control-label" })
                </div>
                <div class="col-md-9">
                    <span>
                        @Html.RadioButtonFor(model => model.Ownership, Project.OwnershipTypes.Customer) Customer <br />
                        @Html.RadioButtonFor(model => model.Ownership, Project.OwnershipTypes.Utility) Utility <br />
                        @Html.RadioButtonFor(model => model.Ownership, Project.OwnershipTypes.ThirdParty) 3rd Party
                        @Html.ValidationMessageFor(model => model.Ownership, "", new { @class = "text-danger" })
                    </span>
                    <p class="tool-tip tooltip-col">Who owns the assets.</p>
                </div>
            </div> -->
            <hr />
            <div class="form-group form-buffer">
                <div class="col-md-12">
                    <button type="submit" class="btn btn-primary pull-right">Save and Continue</button>
                </div>
            </div>
  </div>
</template>

<script>
  export default {
    computed: {
      projectId() {
        return this.$store.state.Project.id;
      },
      projectName() {
        return this.$store.state.Project.name;
      },
    },

