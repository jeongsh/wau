<template>
  <div class="wrap-editor">
    <!-- <div class="modal-loading" v-if="isLoading">
      로딩중...
    </div> -->
    <div class="container d-flex ai-center g-32">
      <div class="wrap-preview">
        <div class="box-preview">
          <Preview />
        </div>
      </div>
      <div class="box-editor">
        <UtilsAccordion :title="'신랑 신부 정보'" :isOpen="true">
          <div class="box-input">
            <p class="input-title">신랑</p>
            <input class="input-s" type="text" v-model="weddingInfo.groom.familyName" placeholder="성" />
            <input class="input-m"type="text" v-model="weddingInfo.groom.name" placeholder="이름" />
            <input class="input-sm"type="text" v-model="weddingInfo.groom.relation" placeholder="관계" />
          </div>
          <div class="box-input">
            <p class="input-title">아버지</p>
            <input class="input-l" type="text" v-model="weddingInfo.groom.parents[0].name" placeholder="이름" />
            <input class="input-sm" type="text" v-model="weddingInfo.groom.parents[0].relation" placeholder="관계" />
          </div>
          <div class="box-input">
            <p class="input-title">어머니</p>
            <input class="input-l" type="text" v-model="weddingInfo.groom.parents[1].name" placeholder="이름" />
            <input class="input-sm" type="text" v-model="weddingInfo.groom.parents[1].relation" placeholder="관계" />
          </div>
          <div class="divider"></div>
          <div class="box-input">
            <p class="input-title">신부</p>
            <input class="input-s" type="text" v-model="weddingInfo.bride.familyName" placeholder="성" />
            <input class="input-m" type="text" v-model="weddingInfo.bride.name" placeholder="이름" />
            <input class="input-sm" type="text" v-model="weddingInfo.bride.relation" placeholder="관계" />
          </div>
          <div class="box-input">
            <p class="input-title">아버지</p>
            <input class="input-l" type="text" v-model="weddingInfo.bride.parents[0].name" placeholder="이름" />
            <input class="input-sm" type="text" v-model="weddingInfo.bride.parents[0].relation" placeholder="관계" />
          </div>
          <div class="box-input">
            <p class="input-title">어머니</p>
            <input class="input-l" type="text" v-model="weddingInfo.bride.parents[1].name" placeholder="이름" />
            <input class="input-sm" type="text" v-model="weddingInfo.bride.parents[1].relation" placeholder="관계" />
          </div>
        </UtilsAccordion>
        <UtilsAccordion :title="'디자인 설정'">
          <div class="box-content">
            <div class="box-input">
              <p class="input-title">폰트</p>
              <UtilsSelectBox
                :title="currentFontLabel"
                :width="140"
                isReverse
              >
                <button
                  v-for="font in fontStyles" 
                  @click="onChangeFontStyle(`${ font.fontFamily }`)" 
                  :class="font.fontFamily">
                  {{ font.label }}
                </button>
              </UtilsSelectBox>
              <UtilsSelectBox
                :title="designInfo.fontSize"
                :width="48"
                isReverse
              >
                <button
                  v-for="size in fontSizes" 
                  @click="onChangeFontSize(`${ size }`)" 
                  :class="size">
                  {{ size }}
                </button>
              </UtilsSelectBox>
            </div>
            <div class="box-input">
              <p class="input-title">테마 컬러</p>
              <div class="box-label-color">
                <label class="label-theme-type" :class="themeColor" v-for="themeColor in themeColors" :key="themeColor">
                  <input type="radio" name="templateColor" id="" :value="themeColor" v-model="designInfo.themeColor" />
                </label>
              </div>
            </div>
          </div>
        </UtilsAccordion>
        <UtilsAccordion :title="'메인 비주얼'">
          <div class="box-label-theme">
            <label class="label-theme-type" v-for="mainVisual in mainVisuals" :key="mainVisual">
              <input type="radio" name="mainVisualType" id="" :value="mainVisual" v-model="designInfo.mainVisual.type" />
              {{ mainVisual }}
            </label>
          </div>
          <div class="box-input">
            <p class="input-title">커버 이미지</p>
          </div>
          <div class="box-input">
            <input type="file" @change="onMainVisualChange" accept="image/*" />
          </div>
          <div class="box-input">
            <p class="input-title">인트로</p>
          </div>
          <div class="box-label-theme">
            <label class="label-theme-type" v-for="introType in introTypes" :key="introType">
              <input type="radio" :value="introType" v-model="designInfo.intro.type" @change="onChangeIntro" />
              {{ introType }}
            </label>
          </div>
        </UtilsAccordion>
        <UtilsAccordion :title="'인사말'">
          <div class="box-input">
            <p class="input-title">인사말</p>
            <UtilsTiptapEditor v-model="designInfo.greeting" />
          </div>
        </UtilsAccordion>
        <UtilsAccordion :title="'디자인 페이지'">
          <div class="box-label-theme">
            <label class="label-theme-type" v-for="designPage in designPages" :key="designPage">
              <input type="radio" name="designPageType" id="" :value="designPage" v-model="designInfo.designPage" />
              {{ designPage }}
            </label>
          </div>
        </UtilsAccordion>
        <UtilsAccordion :title="'예식 일시'">
          <div class="box-input">
            <p class="input-title">예식일</p>
            <div class="wrap-datepicker">
              <button class="btn-datepicker" @click="toggleDatePicker">
                {{ formatedDate(weddingInfo.date) }}
              </button>
              <div class="box-datepicker">
                <DatePicker 
                  v-model="weddingInfo.date"
                  :format="'yyyy-MM-dd'"
                />
              </div>
            </div>
          </div>
          <div class="box-input">
            <p class="input-title">예식시간</p>
            <UtilsSelectBox
              :title=weddingInfo.time.ampm
              :width="62"
              isReverse
            >
              <button
                v-for="ampm in ampmOptions" 
                @click="onChangeAmpm(`${ ampm }`)" 
              >
                {{ ampm }}
              </button>
            </UtilsSelectBox>
            <UtilsSelectBox
              :title="weddingInfo.time.hour + '시'"
              :width="68"
              isReverse
            >
              <button
                v-for="hour in hourOptions" 
                @click="onChangeHour(`${ hour }`)" 
              >
                {{ hour }}시
              </button>
            </UtilsSelectBox>
            <UtilsSelectBox
              :title="weddingInfo.time.minute + '분'"
              :width="68"
              isReverse
            >
              <button
                v-for="minute in minuteOptions" 
                @click="onChangeMinute(`${ minute }`)" 
              >
                {{ minute }}분
              </button>
            </UtilsSelectBox>
          </div>
          <div class="box-input ai-center">
            <p class="input-title">캘린더</p>
            <UtilsToggleSwitch v-model="designInfo.calendar.isShowCalendar" />
          </div>
          <div class="box-input ai-center">
            <p class="input-title">디데이</p>
            <UtilsToggleSwitch v-model="designInfo.calendar.isShowCountdown" />
          </div>
        </UtilsAccordion>
        <UtilsAccordion :title="'예식 장소'">
          <div class="box-input">
            <p class="input-title">주소</p>
            <div class="address-search-container">
              <input 
                class="input-address" 
                type="text" 
                v-model="weddingInfo.location.address" 
                @click="openPostcodeSearch"
                @keyup.enter="handleAddressSearch"
                placeholder="주소를 검색하려면 클릭하세요" 
                readonly
              />
              <button class="btn-postcode" @click="openPostcodeSearch">우편번호 검색</button>
            </div>
          </div>
          <div id="map" style="width:100%;height:300px;margin:8px 0;border-radius:8px;border:1px solid #dbdbdb;"></div>
          <div class="box-input">
            <p class="input-title">예식장 이름</p>
            <input class="input-l" type="text" v-model="weddingInfo.location.name" placeholder="층과 홀을 입력해주세요." />
          </div>
          <div class="box-input">
            <p class="input-title">층 / 홀</p>
            <input class="input-l" type="text" v-model="weddingInfo.location.detail" placeholder="층과 홀을 입력해주세요." />
          </div>
          <div class="box-input">
            <p class="input-title">연락처</p>
            <input class="input-l" type="text" v-model="weddingInfo.location.number" placeholder="-없이 입력해주세요." />
          </div>
        </UtilsAccordion>

        <UtilsAccordion title="연락처" v-model:isSwitch="designInfo.isShowContact">
          <div class="box-input">
            <p class="input-title">신랑 연락처</p>
            <input class="input-l" type="text" v-model="weddingInfo.groom.number" placeholder="-없이 입력해주세요." />
          </div>
          <div class="box-input" v-if="!weddingInfo.groom.parents[0].isDied">
            <p class="input-title">신랑 아버지</p>
            <input class="input-l" type="text" v-model="weddingInfo.groom.parents[0].number" placeholder="-없이 입력해주세요." />
          </div>
          <div class="box-input" v-if="!weddingInfo.groom.parents[1].isDied">
            <p class="input-title">신랑 어머니</p>
            <input class="input-l" type="text" v-model="weddingInfo.groom.parents[1].number" placeholder="-없이 입력해주세요." />
          </div>
          <div class="box-input">
            <p class="input-title">신부 연락처</p>
            <input class="input-l" type="text" v-model="weddingInfo.bride.number" placeholder="-없이 입력해주세요." />
          </div>
          <div class="box-input">
            <p class="input-title" v-if="!weddingInfo.bride.parents[0].isDied">신부 아버지</p>
            <input class="input-l" type="text" v-model="weddingInfo.bride.parents[0].number" placeholder="-없이 입력해주세요." />
          </div>
          <div class="box-input" v-if="!weddingInfo.bride.parents[1].isDied">
            <p class="input-title">신부 어머니</p>
            <input class="input-l" type="text" v-model="weddingInfo.bride.parents[1].number" placeholder="-없이 입력해주세요." />
          </div>
        </UtilsAccordion>
        <UtilsAccordion title="계좌번호" v-model:isSwitch="designInfo.isShowAccount">
          <div class="box-input">
            <p class="input-title">신랑</p>
          </div>
          <div class="box-account">
            <div class="box-input">
              <input class="input-m" type="text" v-model="weddingInfo.groom.account.bank" placeholder="은행명" />
              <input class="input-m" type="text" v-model="weddingInfo.groom.account.name" placeholder="예금주" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.groom.account.number" placeholder="계좌번호" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.groom.account.kakaoPay" placeholder="카카오 페이 연동" />
            </div>
          </div>
          <div class="box-input ai-center jc-between">
            <p class="input-title">신랑 아버지</p>
            <UtilsToggleSwitch v-model="weddingInfo.groom.parents[0].isUseAccount" />
          </div>
          <div class="box-account" v-show="weddingInfo.groom.parents[0].isUseAccount">
            <div class="box-input">
              <input class="input-m" type="text" v-model="weddingInfo.groom.parents[0].account.bank" placeholder="은행명" />
              <input class="input-m" type="text" v-model="weddingInfo.groom.parents[0].account.name" placeholder="예금주" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.groom.parents[0].account.number" placeholder="계좌번호" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.groom.parents[0].account.kakaoPay" placeholder="카카오 페이 연동" />
            </div>
          </div>
          <div class="box-input ai-center jc-between">
            <p class="input-title">신랑 어머니</p>
            <UtilsToggleSwitch v-model="weddingInfo.groom.parents[1].isUseAccount" />
          </div>
          <div class="box-account" v-show="weddingInfo.groom.parents[1].isUseAccount">
            <div class="box-input">
              <input class="input-m" type="text" v-model="weddingInfo.groom.parents[1].account.bank" placeholder="은행명" />
              <input class="input-m" type="text" v-model="weddingInfo.groom.parents[1].account.name" placeholder="예금주" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.groom.parents[1].account.number" placeholder="계좌번호" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.groom.parents[1].account.kakaoPay" placeholder="카카오 페이 연동" />
            </div>
          </div>
          <div class="divider"></div>
          <div class="box-input">
            <p class="input-title">신부</p>
          </div>
          <div class="box-account">
            <div class="box-input">
              <input class="input-m" type="text" v-model="weddingInfo.bride.account.bank" placeholder="은행명" />
              <input class="input-m" type="text" v-model="weddingInfo.bride.account.name" placeholder="예금주" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.bride.account.number" placeholder="계좌번호" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.bride.account.kakaoPay" placeholder="카카오 페이 연동" />
            </div>
          </div>
          <div class="box-input ai-center jc-between">
            <p class="input-title">신부 아버지</p>
            <UtilsToggleSwitch v-model="weddingInfo.bride.parents[0].isUseAccount" />
          </div>
          <div class="box-account" v-show="weddingInfo.bride.parents[0].isUseAccount">
            <div class="box-input">
              <input class="input-m" type="text" v-model="weddingInfo.bride.parents[0].account.bank" placeholder="은행명" />
              <input class="input-m" type="text" v-model="weddingInfo.bride.parents[0].account.name" placeholder="예금주" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.bride.parents[0].account.number" placeholder="계좌번호" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.bride.parents[0].account.kakaoPay" placeholder="카카오 페이 연동" />
            </div>
          </div>
          <div class="box-input ai-center jc-between">
            <p class="input-title">신부 어머니</p>
            <UtilsToggleSwitch v-model="weddingInfo.bride.parents[1].isUseAccount" />
          </div>
          <div class="box-account" v-show="weddingInfo.bride.parents[1].isUseAccount">
            <div class="box-input">
              <input class="input-m" type="text" v-model="weddingInfo.bride.parents[1].account.bank" placeholder="은행명" />
              <input class="input-m" type="text" v-model="weddingInfo.bride.parents[1].account.name" placeholder="예금주" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.bride.parents[1].account.number" placeholder="계좌번호" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.bride.parents[1].account.kakaoPay" placeholder="카카오 페이 연동" />
            </div>
          </div>
        </UtilsAccordion>
        <UtilsAccordion title="갤러리" v-model:isSwitch="designInfo.gallery.isShowGallery">
          <div class="box-input">
            <p class="input-title">갤러리 타입</p>
            <div class="box-btn-type">
              <button
                v-for="galleryType in galleryTypes" 
                @click="designInfo.gallery.galleryType = galleryType" 
                :key="galleryType"
                :class="`btn-gallery-type ${designInfo.gallery.galleryType === galleryType ? 'active' : ''}`"
                class="btn-gallery-type"
              >
                {{ galleryType }}
              </button>
            </div>
          </div>
          <div class="box-input">
            <p class="input-title" style="width: auto">이미지 업로드</p>
          </div>
          <div class="wrap-thumbnail">
            <div class="box-thumbnail" v-for="(image, index) in designInfo.gallery.images">
              <img
                :key="index"
                :src="image"
                alt=""
                class="gallery-thumnail"
              >
              <button class="btn-delete-thumbnail" @click="onDeleteGalleryImage(index)">
                x
              </button>
            </div>
            <label class="label-upload-thumbnail">
              <input type="file" multiple @change="onGalleryImageChange" accept="image/*" />
              +
            </label>
          </div>
        </UtilsAccordion>
        <UtilsAccordion title="동영상" v-model:isSwitch="designInfo.video.isShowVideo">
          <div class="box-input">
            <p class="input-title">동영상 URL</p>
            <input class="input-l" type="text" @change="onChangeVideoUrl" v-model="videoUrl" placeholder="유튜브, 비메오 등 동영상 URL을 입력해주세요." />
          </div>
          <div class="box-input">
            <p class="input-title">동영상 타입</p>
            <div class="box-btn-type">
              <button
                v-for="videoType in videoTypes" 
                @click="designInfo.video.type = videoType.type" 
                :key="videoType.type"
                :class="`btn-video-type ${designInfo.video.type === videoType.type ? 'active' : ''}`"
              >
                {{ videoType.label }}
              </button>
            </div>
          </div>
        </UtilsAccordion>
        <UtilsAccordion title="참석여부(RSVP)" v-model:isSwitch="designInfo.rsvp.isShowRsvp">
          <div class="box-input">
            <p class="input-title">제목</p>
            <input class="input-l" type="text" v-model="designInfo.rsvp.title" placeholder="제목을 입력해주세요." />
          </div>
          <div class="box-input">
            <p class="input-title">설명</p>
            <textarea class="input-l" v-model="designInfo.rsvp.description" placeholder="설명을 입력해주세요."></textarea>
          </div>
          <div class="box-label">
            <label class="label-rsvp-type">
              <input type="checkbox" v-model="designInfo.rsvp.isShowPeopleCount" />
              인원
            </label>
            <label class="label-rsvp-type">
              <input type="checkbox" v-model="designInfo.rsvp.isShowNumber" />
              연락처
            </label>
            <label class="label-rsvp-type">
              <input type="checkbox" v-model="designInfo.rsvp.isShowMessage" />
              전달사항
            </label>
            <label class="label-rsvp-type">
              <input type="checkbox" v-model="designInfo.rsvp.isShowEating" />
              식사 여부
            </label>
            <label class="label-rsvp-type">
              <input type="checkbox" v-model="designInfo.rsvp.isShowRide" />
              대절 버스 탑승
            </label>
          </div>
        </UtilsAccordion>
      </div>
      <div class="box-order">
        <h3 class="order-title">컴포넌트 순서</h3>
        <div class="order-list" ref="sortableContainer">
          <div 
            v-for="component in orderedComponents" 
            :key="component.id"
            :data-id="component.id"
            class="order-item"
            :style="`${ component.isActive ? '' : 'display: none;' }`"
          >
            <div class="drag-handle">⋮⋮</div>
            <span class="component-name">{{ component.name }}</span>
            <div class="component-status">
              <span v-if="component.isRequired" class="badge required">필수</span>
              <span v-else-if="component.isActive" class="badge active">활성</span>
              <span v-else class="badge inactive">비활성</span>
            </div>
          </div>
        </div>
        <p class="order-note">드래그하여 순서를 변경하세요</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import imageCompression from 'browser-image-compression';
import { useEditorStore } from '~/stores/editor';
import getVideoId from 'get-video-id';
import Sortable from 'sortablejs';

// 카카오맵 관련 변수
let map: any = null;
let geocoder: any = null;
let marker: any = null;

// 카카오맵 초기화
const initKakaoMap = () => {
  if (typeof window !== 'undefined' && (window as any).kakao) {
    const container = document.getElementById('map');
    const options = {
      center: new (window as any).kakao.maps.LatLng(37.5665, 126.9780), // 서울시청 좌표
      level: 3
    };

    map = new (window as any).kakao.maps.Map(container, options);
    geocoder = new (window as any).kakao.maps.services.Geocoder();
    
    // 마커 생성
    marker = new (window as any).kakao.maps.Marker({
      position: map.getCenter()
    });
    marker.setMap(map);

    // 기존 주소가 있다면 해당 위치로 이동
    if (weddingInfo.value.location.address) {
      searchAndMoveToAddress(weddingInfo.value.location.address);
    }
  }
};

// 주소 검색 및 지도 이동
const searchAndMoveToAddress = (address: string) => {
  if (!geocoder || !address.trim()) return;

  geocoder.addressSearch(address, (result: any, status: any) => {
    if (status === (window as any).kakao.maps.services.Status.OK) {
      const coords = new (window as any).kakao.maps.LatLng(result[0].y, result[0].x);
      
      // 지도 중심을 결과값으로 받은 위치로 이동
      map.setCenter(coords);
      
      // 마커를 결과값으로 받은 위치로 이동
      marker.setPosition(coords);
      
      // 좌표 정보 저장
      weddingInfo.value.location.latitude = parseFloat(result[0].y);
      weddingInfo.value.location.longitude = parseFloat(result[0].x);
    } else {
      alert('주소를 찾을 수 없습니다.');
    }
  });
};

// 주소 검색 버튼 클릭 핸들러
const handleAddressSearch = () => {
  const address = weddingInfo.value.location.address;
  if (!address.trim()) {
    alert('주소를 입력해주세요.');
    return;
  }
  searchAndMoveToAddress(address);
};

// 카카오맵 스크립트 로드
const loadKakaoMapScript = () => {
  return new Promise((resolve) => {
    if ((window as any).kakao) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=f58ab8222e504ffe56691bb59fda414f&libraries=services&autoload=false';
    script.onload = () => {
      (window as any).kakao.maps.load(() => {
        resolve(true);
      });
    };
    document.head.appendChild(script);
  });
};

// Daum 우편번호 서비스 로드
const loadDaumPostcodeScript = () => {
  return new Promise((resolve) => {
    if ((window as any).daum && (window as any).daum.Postcode) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => resolve(true);
    document.head.appendChild(script);
  });
};

// 우편번호 검색 팝업 열기
const openPostcodeSearch = async () => {
  try {
    await loadDaumPostcodeScript();
    
    new (window as any).daum.Postcode({
      oncomplete: function(data: any) {
        // 선택한 주소의 기본 정보
        let addr = ''; // 주소 변수
        let extraAddr = ''; // 참고항목 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 도로명 주소 선택
          addr = data.roadAddress;
        } else { // 지번 주소 선택 - J
          addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
          if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
            extraAddr += data.bname;
          }
          if(data.buildingName !== '' && data.apartment === 'Y'){
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          if(extraAddr !== ''){
            extraAddr = ' (' + extraAddr + ')';
          }
        }

        // 기본 주소와 상세 주소 분리
        baseAddress.value = addr;
        weddingInfo.value.location.address = addr + extraAddr;
        
        // 우편번호 검색 후 자동으로 지도 이동
        searchAndMoveToAddress(addr);
      },
      onresize: function(size: any) {
        // 팝업 크기 조정
      },
      width: '100%',
      height: '100%'
    }).open();
  } catch (error) {
    console.error('우편번호 서비스 로드 실패:', error);
    alert('우편번호 검색 서비스를 불러올 수 없습니다.');
  }
};

// 상세주소 업데이트
const updateFullAddress = () => {
  const fullAddress = baseAddress.value + (detailAddress.value ? ' ' + detailAddress.value : '');
  weddingInfo.value.location.address = fullAddress;
};
const editorStore = useEditorStore();
const { weddingInfo, designInfo, orderedComponents } = storeToRefs(editorStore);

const introTypes = ['A', 'B', 'C'];
const mainVisuals = ['A', 'B'];
const designPages = ['A', 'B', 'C'];
const themeColors = ['blue', 'orange', 'pink', 'yellow','brown', 'charcoal'];
const galleryTypes = ['Swipe', 'Grid'];
const fontStyles = [
  {
    fontFamily: 'pretendard',
    label: '프리텐다드',
  },
  {
    fontFamily: 'corncorn',
    label: '온글잎 콘콘체',
  },
  {
    fontFamily: 'gmarket',
    label: 'G마켓 산스',
  },
  {
    fontFamily: 'lee-seoyun',
    label: '이서윤체',
  }
];

const fontSizes =[
  'S',
  'M',
  'L',
]

const ampmOptions = [
  '오전',
  '오후'
];

const hourOptions = [
  '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
  '10', '11', '12'
]

const minuteOptions = [
  '0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'
];

const videoTypes = [
  {
    type: 'horizontal',
    label: '16:9',
  },

  {
    type: 'vertical',
    label: '9:16',
  },
];
const currentFontLabel = computed(() => {
  const font = fontStyles.find(f => f.fontFamily === designInfo.value.fontStyle);
  return font ? font.label : '프리텐다드';
});

const formatedDate = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const isLoading = ref(true);
const videoUrl = ref<string | null>(null);
const sortableContainer = ref<HTMLElement | null>(null);
const detailAddress = ref('');
const baseAddress = ref('');
let sortableInstance: Sortable | null = null;

onMounted(async () => {
  // 기존 주소가 있다면 기본 주소와 상세 주소 분리
  if (weddingInfo.value.location.address) {
    baseAddress.value = weddingInfo.value.location.address;
  }

  // 카카오맵 스크립트 로드 및 초기화
  try {
    await loadKakaoMapScript();
    nextTick(() => {
      initKakaoMap();
    });
  } catch (error) {
    console.error('카카오맵 로드 실패:', error);
  }

  // box-datepicker가 아닌 곳을 클릭하면 box-datepicker의 active 클래스를 제거
  document.addEventListener('click', (event) => {
    const wrapDatePicker = document.querySelector('.wrap-datepicker');
    const datePicker = document.querySelector('.box-datepicker') as HTMLElement;
    if (wrapDatePicker && !wrapDatePicker.contains(event.target as Node)) {
      datePicker.classList.remove('active');
    }
    // vc-day-content이면 box-datepicker의 active 클래스를 제거
    if ((event.target as HTMLElement).classList.contains('vc-day-content')) {
      datePicker.classList.remove('active');
    }
  });

  // 드래그 앤 드롭 초기화
  nextTick(() => {
    if (sortableContainer.value) {
      sortableInstance = Sortable.create(sortableContainer.value, {
        animation: 150,
        handle: '.drag-handle',
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        onEnd: (evt: Sortable.SortableEvent) => {
          if (evt.oldIndex !== undefined && evt.newIndex !== undefined) {
            const currentOrder = [...designInfo.value.componentOrder];
            const movedItem = currentOrder.splice(evt.oldIndex, 1)[0];
            currentOrder.splice(evt.newIndex, 0, movedItem);
            editorStore.updateComponentOrder(currentOrder);
          }
        }
      });
    }
    isLoading.value = false;
  });
});

onBeforeUnmount(() => {
  if (sortableInstance) {
    sortableInstance.destroy();
  }
});

const onChangeIntro = () => {
  designInfo.value.intro.isShowIntro = true;
};

const convertToWebp = async (file: File): Promise<string> => {
  // file이 jpg, jpeg,png 면 webp로 webp면 변환 안하고 gif면 webm으로
  if(file.type === 'image/webp') return await imageCompression.getDataUrlFromFile(file);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    fileType: `${file.type === 'image/gif' ? 'image/webm' : 'image/webp'}`,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return await imageCompression.getDataUrlFromFile(compressedFile);
  } catch (error) {
    console.error('이미지 WebP 변환 실패:', error);
    throw error;
  }
};

const onMainVisualChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    try {
      const webpImage = await convertToWebp(target.files[0]);
      designInfo.value.mainVisual.image = webpImage;
    } catch (error) {
      console.error('메인 비주얼 이미지 변환 실패:', error);
    }
  }
};

const onGalleryImageChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const files = Array.from(target.files);
    for (const file of files) {
      try {
        const webpImage = await convertToWebp(file);
        if (designInfo.value.gallery.images) {
          designInfo.value.gallery.images.push(webpImage);
        } else {
          designInfo.value.gallery.images = [webpImage];
        }
      } catch (error) {
        console.error('갤러리 이미지 변환 실패:', error);
      }
    }
  }
};

const onDeleteGalleryImage = (index: number) => {
  if (designInfo.value.gallery.images) {
    designInfo.value.gallery.images.splice(index, 1);
  }
};

const onChangeFontStyle = (font: string) => {
  designInfo.value.fontStyle = font;
};

const onChangeFontSize = (size: string) => {
  designInfo.value.fontSize = size;
};

const onChangeAmpm = (ampm: string) => {
  weddingInfo.value.time.ampm = ampm;
};

const onChangeHour = (time: string) => {
  weddingInfo.value.time.hour = parseInt(time, 10);
};

const onChangeMinute = (minute: string) => {
  weddingInfo.value.time.minute = parseInt(minute, 10);
};

const toggleDatePicker = () => {
  const datePicker = document.querySelector('.box-datepicker') as HTMLElement;
  datePicker.classList.toggle('active');
};

const onChangeVideoUrl = () => {
  if (videoUrl.value) {
    const videoId = getVideoId(videoUrl.value) as { id: string, service: string };
    designInfo.value.video.videoUrl = videoId.id;
  }
};

</script>

<style lang="scss" scoped>
.modal-loading{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.wrap-editor {
  width: 100%;
  height: 100vh;
  background: #f4f3f0;
  .container{
    height: 100%;
    padding: 24px;
  }
  .box-editor{
    flex: 1;
    height: 100%;
    overflow-y: auto;
  }
  
  .box-input{
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    &:last-child{
      margin-bottom: 0;
    }
    .input-title{
      line-height: 42px;
      font-size: 14px;
      font-weight: 600;
      margin-right: 8px;
      width: 64px;
    }
    input[type="text"]{
      padding-left: 16px;
      border: 1px solid #dbdbdb;
      outline: none;
      color: #2b2b2b;
      height: 42px;
      min-height: 40px;
      font-size: 13px;
      background: #fff;
      padding: 10px 16px;
      border-radius: 8px;
    }
    .input-s{
      width: 60px;
    }
    .input-m{
      width: 90px;
    }
    .input-sm{
      width: 76px;
    }
    .input-l{
      width: 158px;
    }
  }
  .divider{
    width: 100%;
    height: 1px;
    background: #dbdbdb;
    margin: 16px 0;
  }
  .box-label-theme{
    display: flex;
    align-items: flex-start;
    gap: 8px;
    .label-theme-type{
      width: calc((100% - 16px) / 3);
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f4f3f0;
      border: 1px solid #dbdbdb;
      border-radius: 8px;
      input{
        display: none;
      }
    }
  }
  .box-label-color{
    display: flex;
    align-items: flex-start;
    gap: 8px;
    .label-theme-type{
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 1px solid #dbdbdb;
      &.blue{
        background: linear-gradient(135deg, rgb(215, 228, 235), rgb(107, 153, 176));
      }
      &.orange{
        background: linear-gradient(135deg, rgb(255, 224, 204), rgb(255, 153, 102));
      }
      &.pink{
        background: linear-gradient(135deg, rgb(255, 224, 236), rgb(255, 153, 204));
      }
      &.yellow{
        background: linear-gradient(135deg, rgb(255, 255, 204), rgb(255, 204, 102));
      }
      &.brown{
        background: linear-gradient(135deg, rgb(230, 220, 210), rgb(150, 120, 100));
      }
      &.charcoal{
        background: linear-gradient(135deg, rgb(220, 220, 220), rgb(100, 100, 100));
      }
      input{
        display: none;
      }
    }
  }
}
.wrap-preview{
  height: 100%;
  width: 400px;
  // background: #333;
  position: relative;
  .box-preview{
    width: 360px;
    height: 740px;
    border-radius: 24px;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
  }
}

.wrap-datepicker{
  position: relative;
  width: 180px;
  .btn-datepicker{
    width: 100%;
    height: 42px;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    background: #fff;
    color: #2b2b2b;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    padding-left: 16px;
  }
  .box-datepicker{
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 100;
    width: 100%;
    display: none;
    &.active{
      display: block;
    }
  }
}
.box-order{
  align-self: flex-start;
  background: #fff;
  border-radius: 8px;
  padding: 18px 24px;
  .order-title{
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  .order-list{
    max-height: 100%;
    overflow-y: auto;
    .order-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border: 1px solid #dbdbdb;
      border-radius: 8px;
      margin-bottom: 8px;
      background: #f4f3f0;
      transition: all 0.2s ease;
      &.required{
        border-color: #ff4d4f;
      }
      &.inactive{
        background: #f9f9f9;
        opacity: 0.6;
      }
      .drag-handle{
        cursor: move;
        font-size: 18px;
        color: #999;
        margin-right: 8px;
        user-select: none;
        &:hover {
          color: #666;
        }
      }
      .component-name{
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        color: #2b2b2b;
      }
      .component-status{
        display: flex;
        align-items: center;
        gap: 4px;
        .badge{
          display: inline-block;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          &.required{
            background: rgba(255, 77, 79, 0.1);
            color: #ff4d4f;
          }
          &.active{
            background: rgba(76, 217, 100, 0.1);
            color: #4cd964;
          }
          &.inactive{
            background: rgba(153, 153, 153, 0.1);
            color: #999;
          }
        }
      }
    }
  }
  .order-note{
    font-size: 12px;
    color: #999;
    margin-top: 8px;
  }
}
// Sortable.js 드래그 상태 스타일
:global(.sortable-ghost) {
  opacity: 0.4;
  background: #e6f7ff !important;
  border-color: #1890ff !important;
}

:global(.sortable-chosen) {
  transform: rotate(5deg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:global(.sortable-drag) {
  opacity: 1;
  transform: rotate(5deg);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}
.box-btn-type{
  display: flex;
  gap: 8px;
  .btn-gallery-type{
    flex: 1;
    height: 42px;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    background: #f4f3f0;
    color: #2b2b2b;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    &.active{
      background: #fff;
      border-color: #2b2b2b;
    }
  }
}
.wrap-thumbnail{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
  .box-thumbnail{
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 8px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      user-select: none;
      -webkit-user-drag: none;
    }
  }
  .gallery-thumbnail{
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
  }
  .btn-delete-thumbnail{
    position: absolute;
    top: 4px;
    right: 4px;
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .label-upload-thumbnail{
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f4f3f0;
    border: 1px dashed #dbdbdb;
    border-radius: 8px;
    cursor: pointer;
    input[type="file"]{
      display: none;
    }
  }
}
.btn-find {
  height: 42px;
  padding: 0 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #0056b3;
  }
}

.address-search-container {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  
  .input-address {
    flex: 1;
    padding: 10px 16px;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    font-size: 13px;
    background: #f8f9fa;
    color: #2b2b2b;
    cursor: pointer;
    
    &::placeholder {
      color: #999;
    }
    
    &:focus {
      outline: none;
      border-color: #007bff;
      background: #fff;
    }
  }
  
  .btn-postcode {
    height: 42px;
    padding: 0 16px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.2s;

    &:hover {
      background: #218838;
    }
  }
}

.input-detail-address {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  font-size: 13px;
  background: #fff;
  color: #2b2b2b;
  margin-bottom: 8px;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
}
</style>
