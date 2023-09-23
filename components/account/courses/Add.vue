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
      <BaseTextArea
        label="  توضیحات کوتاه: "
        name="shortDescription"
        v-model="data.shortDescription"
        id="shortDescription"
        placeholder="توضیح کوتاهی از دوره را وارد کنید"
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
    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseSelectBox
        required
        v-model="data.courseLevel"
        label="سطح دوره  "
        out-line
        name="courseLevel"
      >
        <option :value="CourseLevel.beginner">مقدماتی</option>
        <option :value="CourseLevel.intermediate">مقدماتی تا پیشرفته</option>
        <option :value="CourseLevel.expert">پیشرفته</option>
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
    <div class="p-2 w-full sm:px-0">
      <BaseInputFile out-line name="imageFile" label="تصویر اصلی " v-model="data.imageFile"/>
    </div>
    <div class="p-2 w-1/2 sm:w-full sm:px-0">
      <BaseInputFile out-line name="demoFile" label="مقدمه دوره " v-model="data.demoFile" />
    </div>
    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseInput
          placeholder="فرمت صحیح: 00:06:27"
          out-line
          name="demoDuration"
          label="مدت زمان ویدئو:"
          dir="ltr"
          v-model="data.demoDuration"
      />
    </div>
    <div class="justify-end flex w-full mt-2">
      <BaseButton type="submit" color="green">ثبت اطلاعات</BaseButton>
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

const emits = defineEmits(['courseCreated'])

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
  demoDuration:''
});
const schema = Yup.object().shape({
  title: Yup.string().required().label("عنوان دوره"),
  categoryId: Yup.number().required().label("دسته بندی اصلی"),
  subCategoryId: Yup.number().required().label("دسته بندی دوم"),
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
  if(data.demoFile !== null)
    courseData.append('demoFile',data.demoFile);
  if(data.imageFile !== null)
  courseData.append('imageFile',data.imageFile);
  courseData.append('courseLevel',data.courseLevel);
  courseData.append('requirements',data.requirements);
  courseData.append('demoDuration',data.demoDuration);

  const fetchResult = await CreateCourse(courseData);
  if(fetchResult.isSuccess){
    const toast = useToast();
    toast.showToast();
    emits('courseCreated');
  }
};
</script>
