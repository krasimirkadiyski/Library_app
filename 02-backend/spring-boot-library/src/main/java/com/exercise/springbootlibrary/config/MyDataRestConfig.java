package com.exercise.springbootlibrary.config;

import com.exercise.springbootlibrary.entity.Book;
import com.exercise.springbootlibrary.entity.Review;
import com.exercise.springbootlibrary.entity.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
        private String theAllowedOrigins = "http://localhost:3000";
        @Override
        public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                          CorsRegistry cors){
            HttpMethod[] theUnsupportedAction = {
                    HttpMethod.POST,
                    HttpMethod.PATCH,
                    HttpMethod.DELETE,
                    HttpMethod.PUT};
            //да се показва id при get request в data-та
            config.exposeIdsFor(Book.class);
            config.exposeIdsFor(Review.class);
            config.exposeIdsFor(User.class);

            disableHttpMthods(Book.class,config,theUnsupportedAction);
            disableHttpMthods(Review.class,config,theUnsupportedAction);
            disableHttpMthods(User.class,config,theUnsupportedAction);

            cors.addMapping(config.getBasePath() + "*/**")
                    .allowedOrigins(theAllowedOrigins);
        }
        private void disableHttpMthods(Class theClass,
                                       RepositoryRestConfiguration config,
                                       HttpMethod[] theUnsupportedActions){
            config.getExposureConfiguration().forDomainType(theClass)
                    .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                    .withCollectionExposure((metdata, httpMethods) ->
                            httpMethods.disable(theUnsupportedActions));
        }
}
