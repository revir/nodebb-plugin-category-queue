<div class="row">
	<div class="col-sm-2 col-xs-12 settings-header">Category Settings</div>
	<div class="col-sm-10 col-xs-12">
		<p class="lead">
			Select categories to automatically queue topics from.
		</p>
		<div class="row category-defaults">
			<form role="form" class="category-queue-settings">
				<!-- BEGIN categories -->
				<div class="form-group col-sm-4 col-xs-6">
					<label for="{../cid}">{../name}</label>
					<select data-cid="{../cid}" id="{../cid}" name="{../cid}" title="{../name}" class="form-control">
						<option value="">Don't queue</option>
						<option value="{../cid}">queue</option>
					</select>

          <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect">
            <input class="mdl-switch__input" type="checkbox" id="comment-{../cid}" name="comment-{../cid}" value="comment-{../cid}" />
            <span class="mdl-switch__label">Queue comments of topic</span>
          </label>
				</div>

				<!-- END categories -->
			</form>
		</div>
	</div>
</div>

<div class="floating-button">
	<button id="save" class="primary btn-primary mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
		<i class="material-icons">save</i>
	</button>
</div>
