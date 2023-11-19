-- DropForeignKey
ALTER TABLE "MovieRating" DROP CONSTRAINT "MovieRating_movieId_fkey";

-- DropForeignKey
ALTER TABLE "SeriesRating" DROP CONSTRAINT "SeriesRating_seriesId_fkey";

-- AddForeignKey
ALTER TABLE "MovieRating" ADD CONSTRAINT "MovieRating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesRating" ADD CONSTRAINT "SeriesRating_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;
