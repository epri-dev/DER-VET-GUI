<template>
  <div class="container body-content">

    <div class="jumbotron dervet-title">
      <img class="logo-img" :src="FullLogo" />
      <img class="epri-logo-img" :src="EPRILogo" />
      <h5>EPRI's Distributed Energy Resource Value Estimation Tool (DER-VET<sup>TM</sup>)</h5>
    </div>

    <hr>
    <div class="row">
      <div class="col-md-12">
        <p class="tool-tip-index tool-tip-index-col">
          DER-VET v1.1.2<br>
          <br>
          Copyright © 2021 Electric Power Research Institute, Inc. All Rights Reserved.<br>
          <br>
          Permission to use, copy, modify, and distribute this software for any purpose<br>
          with or without fee is hereby granted, provided that the above copyright<br>
          notice and this permission notice appear in all copies.<br>
          <br>
          THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND<br>
          ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED<br>
          WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE <br>
          DISCLAIMED. IN NO EVENT SHALL EPRI BE LIABLE FOR ANY DIRECT, INDIRECT, <br>
          INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT<br>
          LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR<br>
          PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF<br>
          LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE<br>
          OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF <br>
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.<br>
          <br>
          Third-Party Software<br>
          EPRI does not own any portion of the software that is attributed
          below.<br>
          <br>
          &#60;CVXPY&#47;1.1.11&#62; - &#60;Steven Diamond&#62;, &#60;diamond@cs.stanford.edu&#62;<br>
          Copyright © 2017 Steven Diamond<br>
          <br>
          Licensed under the Apache License, Version 2.0 (the "License");<br>
          you may not use this file except in compliance with the License.<br>
          You may obtain a copy of the License at<br>
          <br>
          &emsp;http://www.apache.org/licenses/LICENSE-2.0<br>
          <br>
          Unless required by applicable law or agreed to in writing, software<br>
          distributed under the License is distributed on an "AS IS" BASIS,<br>
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.<br>
          See the License for the specific language governing permissions and<br>
          limitations under the License.<br>
          <br>
          CVXPY is provided by the copyright holders and contributors "as is" and<br>
          any express or implied warranties, including, but not limited to, the<br>
          implied warranties of merchantability and fitness for a particular<br>
          purpose are disclaimed.<br>
          <br>
          This software relies on CVXPY to interface with work(s) covered by the<br>
          following copyright and permission notice(s): <br>
          <br>
          GLPK 5.0 - Andrew Makhorin, mao@gnu.org<br>
          Copyright © 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,<br>
          2010, 2011, 2012 Andrew Makhorin, Department for Applied Informatics,<br>
          Moscow Aviation Institute, Moscow, Russia. All rights reserved.<br>
          <br>
          Licensed under GNU Public License v3.0; you may not use GLPK except in<br>
          compliance with the License. You may obtain a copy of the License at<br>
          https://www.gnu.org/licenses/gpl-3.0.en.html.<br>
          <br>
          GLPK is a free program and is provided by the copyright holders and <br>
          contributors "as is" and any express or implied warranties, including,<br>
          but not limited to, the implied warranties of merchantability and fitness<br>
          for a particular purpose are disclaimed.
        </p>
      </div>
    </div>
  </div>

</template>

<script language="ts">
  import FullLogo from '@/assets/FullLogo.png';
  import EPRILogo from '@/assets/EPRILogo.png';

  export default {
    name: 'about',
    data() {
      return {
        EPRILogo,
        FullLogo,
      };
    },
  };
</script>
