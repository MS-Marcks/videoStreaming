FROM nginx:1.18.0-alpine
COPY dist/video /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 443
CMD ["nginx","-g","daemon off;"]