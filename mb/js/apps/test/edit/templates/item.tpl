<div class="Testess02">
            <div class="fixed-top">
                <div class="s-item bdb-1px">
                    <div class="sitem-l sitem-pad">
                        <div class="sattr-add">收货人:</div>
                        <div class="svalue"> <input type="text" class="ad-name" value="<%- userName %>" maxlength="25" name="Testess.name" id="uersNameId"></div>
                    </div>
                    <span id="clearUserName" class="s-close"><i></i></span>
                </div>
                <div class="s-item bdb-1px">
                    <div class="sitem-l sitem-pad">
                        <div class="sattr-add">手机号码:</div>
                        <div class="svalue" id="mobileInputDiv">  <input type="tel" class="ad-mobile" value="<%- phoneNumber %>" name="Testess.mobile" maxlength="11" id="mobilePhoneId"></div>
                    </div>
                    <span id="clearPhone" class="s-close"><i></i></span>
                </div>
             </div>


                       <div class="Testess-big bdb-1px">
                <div id="fixed-bottom" class="fixed-bottom" style="width: 100%;">
                                        <div region-data="17,1381,50713,52576" id="selectTestessBtn" class="col02">
                        <div class="s-item bdb-1px">
                            <div class="sitem-l sitem-pad add-box">
                                <div class="sattr-add">所在地区:
                                </div>
                                <div class="svalue-add">                                    <span id="TestessLabelId" class="svalue-add"><%- area_combo %></span>
                                </div>
                            </div>
                            <span class="s-point"></span>
                        </div>
                    </div>
                    <div class="s-item change-padd">
                        <div class="sitem-l sitem-pad change-wid">
                            <div class="sattr-add change-padding">详细地址:</div>
                            <div class="svalue w65 change-po">
                                <span id="detailedTestessId" class="grey"></span>
                                <textarea rows="1" maxlength="410" id="Testess_where" name="Testess.where" class="textauto change-sty" data-autosize-on="true" style="overflow: hidden; word-wrap: break-word; height: 19px;"><%- detail %></textarea>
                            </div>
                        </div>
                        <span id="clearTestess" class="s-text-close"><i></i></span>
                    </div>
                </div>

                <!-- 5.0新增地图入口 -->
                <div id="map-inter" onclick="mapLocation()" class="map-inter" style="display: none;">
                    <div class="Testess-position">
                        <span></span>
                        <i>定位地址</i>
                    </div>
                </div>
                <div style="clear:both"></div>
            </div>
                             <script type="text/javascript">
                    $("#fixed-bottom").css("width","100%");
                    $("#map-inter").css("display","none");
                </script>


            <div class="search-result"></div>
            <div class="s-item bdb-1px set-default">
                <div class="sitem-m sitem-pad change-wp">
                    <div class="sattr change-fl">设为默认地址</div>
                    <span class="pay-attention-Testess">注：每次下单时会使用该地址（轻松购下单除外）</span>
                </div>
                                <div class="myswitch"></div>
                            </div>

        </div>
        <div class="check-btn-auto">
                <div class="check-btn-total">

                                     <a class="check-btn-red" id="submitId" href="javascript:void(0);">保存并使用</a>
                            </div>
            </div>