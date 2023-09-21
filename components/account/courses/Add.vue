<template>
  <Form
    v-slot="{ errors }"
    :validation-schema="schema"
    @submit="addCourse"
    class="flex flex-wrap"
  >
    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseInput
        placeholder="عنوان    "
        out-line
        name="title"
        label="عنوان دوره:"
        v-model="data.title"
      />
    </div>
    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseInput
        placeholder="  عنوان انگلیسی    "
        out-line
        name="slug"
        label="عنوان انگلیسی (slug):"
        v-model="data.slug"
      />
    </div>
    <div class="w-full p-2 sm:w-full sm:px-0">
      <BaseInput
        placeholder="قیمت دوره  "
        type="number"
        out-line
        name="price"
        label=" قیمت دوره : (0 = رایگان)"
        v-model="data.price"
      />
    </div>
    <div class="w-full p-2 sm:px-0">
      <BaseHtmlEditor
        label="توضیحات: "
        name="description"
        v-model="data.description"
        id="question_text2"
      />
    </div>

    <div class="w-full p-2 sm:px-0">
      <BaseHtmlEditor
        label="  توضیحات کوتاه: "
        name="shortDescription"
        v-model="data.shortDescription"
        id="question_text"
      />
    </div>

    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseSelectBox
        required
        v-model="data.categoryId"
        label="دسته بندی اصلی"
        out-line
        name="categoryId"
        @change="categorySelected($event)"
      >
        <option v-if="categories && categories.length > 0" v-for="c in categories" :key="c.id" :value="c.id">{{c.title}}</option>
      </BaseSelectBox>
    </div>
    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseSelectBox
        required
        v-model="data.subCategoryId"
        label="دسته بندی دوم"
        out-line
        name="subCategoryId"
      >
        <option v-if="subCategories && subCategories.length > 0" v-for="c in subCategories" :key="c.id" :value="c.id" >{{c.title}}</option>
      </BaseSelectBox>
    </div>
    <div class="p-2 w-1/2 sm:px-0">
      <BaseInputFile out-line name="imageFile" label="تصویر اصلی " v-model="data.imageFile"/>
    </div>
    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseSelectBox
        required
        v-model="data.courseLevel"
        label="سطح دوره  "
        out-line
        name="courseLevel"
      >
        <option v-for="level in CourseLevel" :key="level" :value="level">{{ level }}</option>
      </BaseSelectBox>
    </div>
    <div class="w-full p-2 sm:w-full sm:px-0">
      <BaseInput
        placeholder="پیشنیاز ها را با - از هم جدا کنید, مثال - c#-js    "
        out-line
        name="requirements"
        label=" پیش نیاز های دوره:"
        v-model="data.requirements"
      />
    </div>
    <div class="p-2 w-1/2 sm:px-0">
      <BaseInputFile out-line name="demoFile" label="مقدمه دوره " v-model="data.demoFile" />
    </div>
    <div class="justify-end flex w-full mt-2">
      <BaseButton color="green">ثبت اطلاعات</BaseButton>
    </div>
  </Form>
</template>
<script setup lang="ts">
import { Form } from "vee-validate";
import * as Yup from "yup";
import {CourseLevel} from "~/models/courses/CourseFilterData";
import {GetCourseCategories} from "~/services/course.service";
import {CourseCategory} from "~/models/courses/Course";
import {CreateCourse} from "~/services/teacher.service";

const categories:Ref<CourseCategory[]> = ref([]);
const subCategories:Ref<CourseCategory[]> = ref([]);

const data = reactive({
  title: "",
  categoryId: null,
  subCategoryId: null,
  price: 0,
  slug: "",
  description: "",
  shortDescription: "",
  demoFile: null,
  imageFile: null,
  courseLevel:"",
  requirements:"",
  DemoDuration:null
});
const schema = Yup.object().shape({
  title: Yup.string().required().label("عنوان دوره"),
  categoryId: Yup.number().required().label("دسته بندی اصلی"),
  subCategoryId: Yup.number().required().label("دسته بندی کوتاه"),
  price: Yup.number().required().label("قیمت"),
  description: Yup.string().required().label("توضیحات"),
  shortDescription: Yup.string().required().label("توضیحات کوتاه"),
  courseLevel: Yup.string().required().label("سطح دوره"),
});

onMounted(async ()=>{
  const categoriesResult = await GetCourseCategories();
  if(categoriesResult.isSuccess){
    categories.value = categoriesResult.data!;
  }
})

const categorySelected = (event:any)=>{
  const id = event.target.value;
  let selectedCategory = categories.value.find(c=>c.id == id);
  subCategories.value = selectedCategory?.childs ?? [];
}

const addCourse = async () => {
  const courseData = new FormData();
  courseData.append('courseTitle',data.title);
  courseData.append('categoryId',data.categoryId.toString());
  courseData.append('subCategoryId',data.subCategoryId.toString());
  courseData.append('price',data.price.toString());
  courseData.append('slug',data.slug);
  courseData.append('description',data.description);
  courseData.append('shortDescription',data.shortDescription);
  courseData.append('demoFile',new Blob(data.demoFile));
  courseData.append('imageFile',new Blob(data.imageFile));
  courseData.append('courseLevel',data.courseLevel);
  courseData.append('requirements',data.requirements);
  courseData.append('DemoDuration',JSON.stringify(data.DemoDuration));

  const fetchResult = await CreateCourse(courseData);
  if(fetchResult.isSuccess){
    const toast = useToast();
    toast.showToast();
  }
};
</script>
