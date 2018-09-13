/*
 * Copyright © 2016-2018 The Thingsboard Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import './billing.scss';

/* eslint-disable import/no-unresolved, import/default */

import billingBodyTemplate from './billing-body.tpl.html';

/* eslint-enable import/no-unresolved, import/default */

/*@ngInject*/
export default function BillingBodyDirective($compile, $templateCache, $log, billingService) {

    var linker = function (scope, element) {

        var template = $templateCache.get(billingBodyTemplate);

        element.html(template);

        scope.createBillingCycle = function() {
            var promise = billingService.createBillingCycle();
            if (promise) {
                promise.then(
                    function success(data) {
                        $log.log('success');
                        $log.log(data);
                    },
                    function fail() {
                        $log.log('fail');
                    }
                );
            }    
        }

        $compile(element.contents())(scope);
    }

    return {
        restrict: "E",
        link: linker,
        scope: { }
    };
}
