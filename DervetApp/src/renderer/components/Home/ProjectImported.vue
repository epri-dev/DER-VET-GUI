<template>
    <div class="container body-content">
        <h2>Project Imported!</h2>
        <hr />
        <div class="form-horizontal form-buffer">
            
        </div>
    </div>
</template>


<!-- <p>
    The project <b>@Model.Project.ProjectName</b> has been successfully imported.
    
    @if (Model.ResultData != null)
    {
        <text>This results for this project were also imported.</text>
    }
</p>
<p class="buffer-top">
    @if (Model.Project.ExpertMode)
    {
        @Html.ActionLink("Open Imported Project", "Edit", "ExpertMode", new { id = Model.Project.ProjectID }, new { @class = "btn btn-warning" })
    }
    else
    {
        @Html.ActionLink("Open Imported Project", "StartProject", "Wizard", null, new { @class = "btn btn-warning" })
    }

    @if (Model.ResultData != null)
    {
        @Html.ActionLink("View Project Results", "Results", "Wizard", new { id = Model.Project.ProjectID, rid = Model.ResultData.ResultID }, new { @class = "btn btn-info buffer-left" })
    }
</p>
 -->