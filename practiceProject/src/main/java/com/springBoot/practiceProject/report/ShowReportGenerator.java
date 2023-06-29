package com.springBoot.practiceProject.report;

import org.springframework.http.HttpHeaders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.springBoot.practiceProject.spring.model.Show;
import com.springBoot.practiceProject.spring.service.ShowService;

import java.io.*;
import java.net.URLEncoder;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;

@Component
public class ShowReportGenerator implements ObjectReportGenerator<Show> {

	@Autowired
	private ShowService showService;

	@Override
	public ResponseEntity<byte[]> generateReport() throws Exception {

		List<Show> shows = showService.selectAll();

		Workbook wb = new HSSFWorkbook();
		Sheet sheet = wb.createSheet("Shows");

		Font titleFont = wb.createFont();
		titleFont.setFontHeightInPoints((short) 20);
		titleFont.setFontName("Arial");
		titleFont.setColor(IndexedColors.BLACK.getIndex());
		titleFont.setBold(true);
		titleFont.setItalic(true);

		CellStyle titleStyle = wb.createCellStyle();
		titleStyle.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
		titleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		titleStyle.setAlignment(HorizontalAlignment.CENTER);
		titleStyle.setFont(titleFont);
		titleStyle.setBorderTop(BorderStyle.THIN);
		titleStyle.setBorderBottom(BorderStyle.THIN);
		titleStyle.setBorderLeft(BorderStyle.THIN);
		titleStyle.setBorderRight(BorderStyle.THIN);
		titleStyle.setTopBorderColor(IndexedColors.BLACK.index);
		titleStyle.setBottomBorderColor(IndexedColors.BLACK.index);
		titleStyle.setLeftBorderColor(IndexedColors.BLACK.index);
		titleStyle.setRightBorderColor(IndexedColors.BLACK.index);

		Font headerFont = wb.createFont();
		headerFont.setFontHeightInPoints((short) 15);
		headerFont.setFontName("Arial");
		headerFont.setColor(IndexedColors.BLACK.getIndex());
		headerFont.setBold(true);
		headerFont.setItalic(false);

		CellStyle headerStyle = wb.createCellStyle();
		headerStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
		headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		headerStyle.setAlignment(HorizontalAlignment.CENTER);
		headerStyle.setFont(headerFont);
		headerStyle.setBorderTop(BorderStyle.THIN);
		headerStyle.setBorderBottom(BorderStyle.THIN);
		headerStyle.setBorderLeft(BorderStyle.THIN);
		headerStyle.setBorderRight(BorderStyle.THIN);
		headerStyle.setTopBorderColor(IndexedColors.BLACK.index);
		headerStyle.setBottomBorderColor(IndexedColors.BLACK.index);
		headerStyle.setLeftBorderColor(IndexedColors.BLACK.index);
		headerStyle.setRightBorderColor(IndexedColors.BLACK.index);

		Font bodyFont = wb.createFont();
		bodyFont.setFontHeightInPoints((short) 15);
		bodyFont.setFontName("Arial");
		bodyFont.setColor(IndexedColors.BLACK.getIndex());
		bodyFont.setBold(false);
		bodyFont.setItalic(false);

		CellStyle bodyStyle = wb.createCellStyle();
		bodyStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex());
		bodyStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		bodyStyle.setAlignment(HorizontalAlignment.LEFT);
		bodyStyle.setFont(bodyFont);
		bodyStyle.setBorderTop(BorderStyle.THIN);
		bodyStyle.setBorderBottom(BorderStyle.THIN);
		bodyStyle.setBorderLeft(BorderStyle.THIN);
		bodyStyle.setBorderRight(BorderStyle.THIN);
		bodyStyle.setTopBorderColor(IndexedColors.BLACK.index);
		bodyStyle.setBottomBorderColor(IndexedColors.BLACK.index);
		bodyStyle.setLeftBorderColor(IndexedColors.BLACK.index);
		bodyStyle.setRightBorderColor(IndexedColors.BLACK.index);

		Row row = sheet.createRow(0);
		Cell cell = row.createCell(1);
		cell.setCellValue("SHOWS");
		cell.setCellStyle(titleStyle);
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 2));

		row = sheet.createRow(1);
		cell = row.createCell(0);
		cell.setCellValue("Show Name");
		cell.setCellStyle(headerStyle);
		cell = row.createCell(1);
		cell.setCellValue("Streaming Platform");
		cell.setCellStyle(headerStyle);
		cell = row.createCell(2);
		cell.setCellValue("Genre");
		cell.setCellStyle(headerStyle);

		for (int i = 0; i < shows.size(); i++) {
			row = sheet.createRow(i + 2);
			cell = row.createCell(0);
			cell.setCellValue(shows.get(i).getShowName());
			cell.setCellStyle(bodyStyle);
			cell = row.createCell(1);
			cell.setCellValue(shows.get(i).getStreamingPlatform());
			cell.setCellStyle(bodyStyle);
			cell = row.createCell(2);
			cell.setCellValue(shows.get(i).getGenre());
			cell.setCellStyle(bodyStyle);
		}

		CellRangeAddress range = new CellRangeAddress(2, 12, 0, 0);
		sheet.setAutoFilter(range);
		sheet.createFreezePane(0, 2);
		sheet.setDisplayGridlines(false);

		for (int i = 0; i < 3; i++) {
			sheet.autoSizeColumn(i);
		}

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		wb.write(outputStream);
		byte[] fileBytes = outputStream.toByteArray();
		wb.close();

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
		try {
		    String encodedFileName = URLEncoder.encode("shows.xlsx", "UTF-8");
		    headers.set("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\"");
		} catch (UnsupportedEncodingException e) {
		    e.printStackTrace();
		}
		return new ResponseEntity<>(fileBytes, headers, HttpStatus.OK);

	}

}
