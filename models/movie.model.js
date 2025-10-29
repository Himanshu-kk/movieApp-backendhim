import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true,
    },

    image: {
      type: String, // Cloudinary URL
      default: "",
    },

    howToDownload: {
      type: String,
      default: "",
    },

    telegramLink: {
      type: String,
      default: "",
    },

    titleNameLanguage: {
      type: String,
      default: "",
    },

    imdbRating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },

    genre: {
      type: String, // single genre if needed
      default: "",
    },

    actors: {
      type: [String],
      default: [],
    },

    director: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "",
    },

    quality: {
      type: String,
      default: "",
    },

    imgSample: {
      type: [String], // extra images if needed
      default: [],
    },

    againTitle: {
      type: [String], // extra titles (slugs, alternate names)
      default: [],
    },

    downloadLinks: {
      type: [String],
      default: [],
    },

    description: {
      type: [String],
      default: [],
    },

    releaseYear: {
      type: [Number],
      default: [],
    },

    genres: {
      type: [String],
      default: [],
      index: true, // helps filtering by genre faster
    },

    categories: {
      type: [String],
      default: [],
      index: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;





// import mongoose from "mongoose";

// const movieSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   image: { type: String },
//   howToDownload: { type: String },
//   telegramLink: { type: String },
//   titleNameLanguage: { type: String },
//   imdbRating: { type: Number },
//   genre: { type: String },
//   actors: { type: [String], default: [] },
//   director: { type: String },
//   language: { type: String },
//   quality: { type: String },
//   imgSample: { type: [String], default: [] },  // multiple image samples
//   againTitle: { type: [String], default: [] }, // again title in different language and multi info like slogs
//   downloadLinks: { type: [String], default: [] },   // multi links like 480p, 720p, 1080p etc
//   description: { type: [String], default: [] },  // detailed description with paragraphs
  
//   // miltiple release years for releases movie list relese like all movie defrent year relese 1998 1999 2000 2001 2010 1015 2020 etc.
//   releaseYear: { type: [Number], default: [] },
  
//   // multiple genres (Action, Horror, Comedy, etc.)
//   genres: { type: [String], default: [] },

//   // multiple categories (Bollywood, South, Hollywood, etc.)
//   categories: { type: [String], default: [] },



// }, { timestamps: true });



// const Movie = mongoose.model("Movie", movieSchema);
// export default Movie;

